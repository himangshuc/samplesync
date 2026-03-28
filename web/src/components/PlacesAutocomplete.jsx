import { useEffect, useRef, useState } from 'react';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Load the Maps script using the recommended callback approach
function loadMapsScript() {
  return new Promise((resolve, reject) => {
    // Already fully loaded
    if (window.google?.maps?.places?.Autocomplete) {
      resolve();
      return;
    }
    // Script tag already injected — wait for existing load
    const existing = document.getElementById('google-maps-script');
    if (existing) {
      existing.addEventListener('load', resolve);
      existing.addEventListener('error', reject);
      return;
    }
    // First call — inject script
    window.__googleMapsCallback = resolve;
    const s = document.createElement('script');
    s.id  = 'google-maps-script';
    s.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=__googleMapsCallback`;
    s.async = true;
    s.defer = true;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

function parseComponents(components) {
  const get = (...types) =>
    components.find(c => types.some(t => c.types.includes(t)))?.long_name || '';
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
  const [ready, setReady] = useState(false);

  // Inject pac-container fix once
  useEffect(() => {
    if (!document.getElementById('pac-style')) {
      const el = document.createElement('style');
      el.id = 'pac-style';
      el.textContent = `.pac-container { z-index: 99999 !important; pointer-events: auto !important; }`;
      document.head.appendChild(el);
    }
  }, []);

  // Load Maps then mark ready
  useEffect(() => {
    if (!API_KEY) {
      console.warn('PlacesAutocomplete: VITE_GOOGLE_MAPS_API_KEY is not set');
      return;
    }
    loadMapsScript()
      .then(() => setReady(true))
      .catch((e) => console.error('Google Maps failed to load:', e));
  }, []);

  // Init Autocomplete once input is rendered and Maps is ready
  useEffect(() => {
    if (!ready || !inputRef.current || acRef.current) return;

    try {
      acRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: 'in' },
        fields: ['address_components', 'formatted_address'],
      });
      acRef.current.addListener('place_changed', () => {
        const place = acRef.current.getPlace();
        if (!place.address_components) return;
        const parsed = parseComponents(place.address_components);
        onSelect?.(parsed);
        // Show only the street part in the input, not the full formatted address
        onChange?.(parsed.address_line1);
      });
    } catch (e) {
      console.error('Autocomplete init failed:', e);
    }
  }, [ready]);

  // Sync external value changes to the DOM input (without making it controlled)
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
