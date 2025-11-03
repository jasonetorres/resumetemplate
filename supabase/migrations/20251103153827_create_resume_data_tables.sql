/*
  # Create Resume and Cover Letter Data Storage

  1. New Tables
    - `user_documents`
      - `id` (uuid, primary key)
      - `user_id` (text) - Browser-based identifier for the user
      - `resume_data` (jsonb) - Complete resume data structure
      - `cover_letter_data` (jsonb) - Complete cover letter data structure
      - `created_at` (timestamptz) - When the document was first created
      - `updated_at` (timestamptz) - When the document was last modified
  
  2. Security
    - Enable RLS on `user_documents` table
    - Since this is a client-side only app without authentication, we'll allow public access
    - Users will be identified by a browser-generated UUID stored in localStorage
  
  3. Indexes
    - Index on user_id for fast lookups
*/

CREATE TABLE IF NOT EXISTS user_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  resume_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  cover_letter_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_user_documents_user_id ON user_documents(user_id);

ALTER TABLE user_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON user_documents
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access"
  ON user_documents
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update access"
  ON user_documents
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access"
  ON user_documents
  FOR DELETE
  TO public
  USING (true);