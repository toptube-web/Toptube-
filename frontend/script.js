// Toptube/fronten/script.js

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Supabase credentials
const supabaseUrl = 'https://maeorayyoxeaucrqcvqo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hZW9yYXl5b3hlYXVjcnFjdnFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNzk0NjEsImV4cCI6MjA2ODg1NTQ2MX0.-xqSt0dT3nw0t3c9rkcKsAoCinvAMxA0ohNPdzjUZFQ';

const supabase = createClient(supabaseUrl, supabaseKey);

// Upload video
async function uploadVideo(file) {
  const fileName = `${Date.now()}_${file.name}`;
  const { data, error } = await supabase.storage
    .from('videos')
    .upload(fileName, file);

  if (error) {
    console.error('Upload error:', error.message);
    alert('Video upload failed');
    return;
  }

  const { data: publicUrlData } = supabase.storage
    .from('videos')
    .getPublicUrl(fileName);

  const publicUrl = publicUrlData.publicUrl;

  // Save video details in Supabase table
  const { error: insertError } = await supabase
    .from('videos')
    .insert([{ url: publicUrl, title: file.name }]);

  if (insertError) {
    console.error('DB insert error:', insertError.message);
    alert('Database insert failed');
  } else {
    alert('Video uploaded successfully!');
    document.getElementById('videoInput').value = '';
    fetchVideos(); // Refresh video list
  }
}

// Fetch videos and display
async function fetchVideos() {
  const { data: videos, error } = await supabase
    .from('videos')
    .select('*')
    .order('id', { ascending: false });

  if (error) {
    console.error('Fetch error:', error.message);
    return;
  }

  const videoContainer = document.getElementById('videoList');
  videoContainer.innerHTML = '';

  videos.forEach((video) => {
    const videoCard = document.createElement('div');
    videoCard.className = 'video-card';

    videoCard.innerHTML = `
      <video width="300" controls>
        <source src="${video.url}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <p>${video.title}</p>
    `;

    videoContainer.appendChild(videoCard);
  });
}

// Upload form listener
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const fileInput = document.getElementById('videoInput');
  const file = fileInput.files[0];
  if (!file) {
    alert('Please select a video file');
    return;
  }

  await uploadVideo(file);
});

// Fetch videos on page load
window.addEventListener('DOMContentLoaded', fetchVideos);
