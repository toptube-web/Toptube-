// File name: Toptube/backend/uploadVideo.js

import { supabase } from './supabaseClient.js'

export async function uploadVideo(file, title) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}.${fileExt}`

  const { data, error } = await supabase.storage
    .from('videos')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) {
    console.error('Upload Error:', error)
    return { error }
  }

  const { data: insertData, error: insertError } = await supabase
    .from('videos')
    .insert([
      {
        title: title,
        video_url: data.path,
        created_at: new Date().toISOString()
      }
    ])

  if (insertError) {
    console.error('DB Insert Error:', insertError)
    return { error: insertError }
  }

  return { data: insertData }
}
