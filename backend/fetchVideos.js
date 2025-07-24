// File name: Toptube/backend/fetchVideos.js

import { supabase } from './supabaseClient.js'

export async function fetchVideos() {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Fetch error:', error)
    return []
  }

  return data
}
