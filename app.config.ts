import 'dotenv/config'

export default {
  expo: {
    name: 'posapp',
    slug: 'pos-app',
    extra: {
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    },
  },
}