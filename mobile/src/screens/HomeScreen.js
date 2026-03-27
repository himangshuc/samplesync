import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import { useAuth } from '../../App';
import api from '../utils/api';

export default function HomeScreen() {
  const { user } = useAuth();
  const [pending, setPending] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const { data } = await api.get('/feedback/pending');
      setPending(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#ee760f" />}>
        <Text style={styles.greeting}>Hi, {user?.first_name} 👋</Text>
        <Text style={styles.sub}>Here's your sampling overview.</Text>

        {pending.length > 0 && (
          <View style={styles.alertCard}>
            <Text style={styles.alertTitle}>⚡ Feedback Needed</Text>
            <Text style={styles.alertDesc}>You have {pending.length} sample{pending.length > 1 ? 's' : ''} awaiting your review.</Text>
            {pending.map((p) => (
              <View key={p.id} style={styles.alertItem}>
                <Text style={styles.alertProduct}>{p.product_name}</Text>
                <Text style={styles.alertBrand}>by {p.company_name}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Next Sample</Text>
          <Text style={styles.cardDesc}>
            {user?.is_eligible_next_sample
              ? 'You're eligible! Your next sample is on its way.'
              : 'Submit pending feedback to unlock your next sample.'}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>How It Works</Text>
          <Text style={styles.step}>1. We match you with products you'll love</Text>
          <Text style={styles.step}>2. Samples arrive every 2 weeks</Text>
          <Text style={styles.step}>3. Share feedback within 3 days</Text>
          <Text style={styles.step}>4. Stay eligible for more samples!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  scroll: { padding: 20, paddingBottom: 40 },
  greeting: { fontSize: 26, fontWeight: '700', color: '#111', marginTop: 8 },
  sub: { fontSize: 15, color: '#6b7280', marginTop: 4, marginBottom: 20 },
  alertCard: { backgroundColor: '#fef7ee', borderWidth: 1, borderColor: '#fad6a5', borderRadius: 16, padding: 16, marginBottom: 16 },
  alertTitle: { fontSize: 16, fontWeight: '700', color: '#b9440a', marginBottom: 4 },
  alertDesc: { fontSize: 13, color: '#93360f', marginBottom: 8 },
  alertItem: { backgroundColor: '#fff', borderRadius: 10, padding: 12, marginTop: 6, borderWidth: 1, borderColor: '#fad6a5' },
  alertProduct: { fontSize: 14, fontWeight: '600', color: '#111' },
  alertBrand: { fontSize: 12, color: '#6b7280', marginTop: 2 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#f3f4f6' },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#111', marginBottom: 8 },
  cardDesc: { fontSize: 14, color: '#6b7280', lineHeight: 20 },
  step: { fontSize: 13, color: '#374151', lineHeight: 22 },
});
