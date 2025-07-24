// File name: Toptube/backend/supabaseClient.js

import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabaseUrl = 'https://maeorayyoxeaucrqcvqo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hZW9yYXl5b3hlYXVjcnFjdnFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNzk0NjEsImV4cCI6MjA2ODg1NTQ2MX0.-xqSt0dT3nw0t3c9rkcKsAoCinvAMxA0ohNPdzjUZFQ'

export const supabase = createClient(supabaseUrl, supabaseKey)
