import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useAuth } from '../../App';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const Field = ({ label, value }) => (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value || '—'}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {(user?.first_name?.[0] || '')}{(user?.last_name?.[0] || '')}
            </Text>
          </View>
          <Text style={styles.name}>{user?.first_name} {user?.last_name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.section}>Personal Info</Text>
          <Field label="Phone" value={user?.phone} />
          <Field label="Gender" value={user?.gender} />
          <Field label="Household Size" value={user?.household_size?.toString()} />
        </View>

        <View style={styles.card}>
          <Text style={styles.section}>Delivery Address</Text>
          <Field label="Address" value={user?.address_line1} />
          <Field label="City" value={user?.city} />
          <Field label="State" value={user?.state} />
          <Field label="ZIP" value={user?.zip_code} />
        </View>

        <View style={styles.card}>
          <Text style={styles.section}>Preferences</Text>
          <Field label="Categories" value={user?.product_categories?.join(', ')} />
          <Field label="Dietary" value={user?.dietary_restrictions?.join(', ')} />
          <Field label="Has Pets" value={user?.has_pets ? 'Yes' : 'No'} />
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  scroll: { padding: 20, paddingBottom: 40 },
  avatarWrap: { alignItems: 'center', marginBottom: 24, marginTop: 8 },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#ee760f', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  avatarText: { color: '#fff', fontSize: 26, fontWeight: '700' },
  name: { fontSize: 22, fontWeight: '700', color: '#111' },
  email: { fontSize: 14, color: '#6b7280', marginTop: 2 },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#f3f4f6' },
  section: { fontSize: 14, fontWeight: '700', color: '#111', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 },
  field: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f9fafb' },
  fieldLabel: { fontSize: 14, color: '#6b7280' },
  fieldValue: { fontSize: 14, fontWeight: '500', color: '#111' },
  logoutBtn: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#fecaca', borderRadius: 14, padding: 16, alignItems: 'center', marginTop: 8 },
  logoutText: { color: '#dc2626', fontSize: 15, fontWeight: '600' },
});
