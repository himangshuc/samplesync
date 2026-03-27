import { useEffect, useRef } from 'react';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function loadMapsScript() {
  const src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
  if (document.querySelector(`script[src="${src}"]`)) {
    return window.google?.maps?.places
      ? Promise.resolve()
      : new Promise((resolve) => { window.__mapsResolve = resolve; });
  }
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

function parseComponents(components) {
  const get  = (...types) => components.find(c => types.some(t => c.types.includes(t)))?.long_name || '';
  const street = [get('street_number'), get('route')].filter(Boolean).join(' ');
  const sub    = get('sublocality_level_2', 'sublocality_level_1', 'sublocality', 'neighborhood');
  return {
    address_line1: street || sub,
    address_line2: street ? sub : '',
    city:     get('locality'),
    state:    get('administrative_area_level_1'),
    zip_code: get('postal_code'),
  };
}

export default function PlacesAutocomplete({ value, onChange, onSelect, placeholder, className }) {
  const inputRef = useRef(null);
  const acRef    = useRef(null);

  useEffect(() => {
    if (!API_KEY) return;

    const init = () => {
      if (!inputRef.current || acRef.current) return;
      acRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: 'in' },
        fields: ['address_components', 'formatted_address'],
      });
      acRef.current.addListener('place_changed', () => {
        const place = acRef.current.getPlace();
        if (!place.address_components) return;
        const parsed = parseComponents(place.address_components);
        onSelect?.(parsed);
        onChange?.(place.formatted_address);
      });
    };

    if (window.google?.maps?.places) {
      init();
    } else {
      loadMapsScript().then(init).catch(console.error);
    }

    // Ensure pac-container is always on top
    const style = document.getElementById('pac-style');
    if (!style) {
      const el = document.createElement('style');
      el.id = 'pac-style';
      el.textContent = `.pac-container { z-index: 99999 !important; }`;
      document.head.appendChild(el);
    }
  }, []);

  // Keep the DOM input in sync when value changes externally (e.g. after onSelect)
  useEffect(() => {
    if (inputRef.current && document.activeElement !== inputRef.current) {
      inputRef.current.value = value ?? '';
    }
  }, [value]);

  return (
    <input
      ref={inputRef}
      type="text"
      className={className}
      placeholder={placeholder || 'Start typing an address…'}
      defaultValue={value}
      onChange={(e) => onChange?.(e.target.value)}
      autoComplete="off"
    />
  );
}
