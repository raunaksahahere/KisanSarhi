import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fwrchfxdvuwxdsokmmxr.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3cmNoZnhkdnV3eGRzb2ttbXhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4Mjg5OTYsImV4cCI6MjA4NjQwNDk5Nn0.2w8NrCraLFA1MNM8wqAgKz5ry4ytD5-_-O4pTbetsOE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)