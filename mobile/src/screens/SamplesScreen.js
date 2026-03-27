import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, RefreshControl } from 'react-native';
import api from '../utils/api';

const statusColors = {
  assigned: { bg: '#fef3c7', text: '#92400e' },
  shipped: { bg: '#dbeafe', text: '#1e40af' },
  delivered: { bg: '#fef7ee', text: '#b9440a' },
  feedback_received: { bg: '#e2eae1', text: '#374d37' },
};

export default function SamplesScreen() {
  const [samples, setSamples] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchSamples = async () => {
    try {
      const { data } = await api.get('/users/samples');
      setSamples(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSamples(); }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchSamples();
    setRefreshing(false);
  };

  const renderItem = ({ item }) => {
    const colors = statusColors[item.status] || { bg: '#f3f4f6', text: '#6b7280' };
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.product}>{item.product_name}</Text>
            <Text style={styles.brand}>{item.company_name}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: colors.bg }]}>
            <Text style={[styles.badgeText, { color: colors.text }]}>{item.status.replace('_', ' ')}</Text>
          </View>
        </View>
        <Text style={styles.date}>{new Date(item.assigned_at).toLocaleDateString()}</Text>
        {item.feedback_submitted && (
          <Text style={styles.reviewed}>✓ Feedback submitted</Text>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Samples</Text>
        <Text style={styles.count}>{samples.length} total</Text>
      </View>
      <FlatList
        data={samples}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#ee760f" />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No samples yet</Text>
            <Text style={styles.emptyDesc}>Matched samples will show up here.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingBottom: 8 },
  title: { fontSize: 24, fontWeight: '700', color: '#111' },
  count: { fontSize: 14, color: '#6b7280' },
  list: { padding: 20, paddingTop: 8 },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: '#f3f4f6' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  product: { fontSize: 15, fontWeight: '600', color: '#111' },
  brand: { fontSize: 13, color: '#6b7280', marginTop: 2 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  date: { fontSize: 12, color: '#9ca3af', marginTop: 8 },
  reviewed: { fontSize: 12, color: '#567856', marginTop: 4, fontWeight: '500' },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyTitle: { fontSize: 16, fontWeight: '600', color: '#111' },
  emptyDesc: { fontSize: 14, color: '#6b7280', marginTop: 4 },
});
