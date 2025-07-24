const supabaseUrl = 'https://maeorayyoxeaucrqcvqo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hZW9yYXl5b3hlYXVjcnFjdnFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNzk0NjEsImV4cCI6MjA2ODg1NTQ2MX0.-xqSt0dT3nw0t3c9rkcKsAoCinvAMxA0ohNPdzjUZFQ';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function uploadVideo() {
  const fileInput = document.getElementById('videoUpload');
  const file = fileInput.files[0];

  if (!file) {
    alert('Please select a file!');
    return;
  }

  const { data, error } = await supabase.storage
    .from('videos') // Bucket name
    .upload(`videos/${Date.now()}_${file.name}`, file);

  if (error) {
    console.error('Upload error:', error.message);
    alert('Upload failed!');
  } else {
    alert('Upload success!');
    loadVideos(); // Refresh video list
  }
}

async function loadVideos() {
  const { data, error } = await supabase.storage
    .from('videos')
    .list('videos', { limit: 100 });

  const list = document.getElementById('videoList');
  list.innerHTML = '';

  if (data) {
    for (const item of data) {
      const { data: urlData } = await supabase.storage
        .from('videos')
        .getPublicUrl(`videos/${item.name}`);
      const video = document.createElement('video');
      video.src = urlData.publicUrl;
      video.controls = true;
      list.appendChild(video);
    }
  }
}

loadVideos(); // Call on page load
