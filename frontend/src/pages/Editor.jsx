import { useNavigate, useParams } from 'react-router-dom';
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'
import React, { useEffect, useState } from 'react'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import Underline from '@tiptap/extension-underline'
import Heading from '@tiptap/extension-heading'
import Collaboration from '@tiptap/extension-collaboration'
import * as Y from 'yjs'
import { TiptapCollabProvider } from '@hocuspocus/provider'
import { toast } from 'react-toastify';
import '../styles/Editor.css'

const getRandomColor = () => {
  const colors = ['#958DF1', '#F98181', '#FBBC88', '#FAF594', '#70CFF8', '#94FADB', '#B9F18D']
  return colors[Math.floor(Math.random() * colors.length)]
}

const MenuBar = ({ editor }) => {
  if (!editor) return null

  return (
    <div className="menuBar">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'is-active' : ''}
      >
        Underline
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        Strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        H2
      </button>
    </div>
  )
}

const Editor = ({ isReadOnly = false }) => {
  const { docId } = useParams()
  const [provider, setProvider] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [doc, setDoc] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const initDocument = async () => {
      try {
        const newDoc = new Y.Doc()
        setDoc(newDoc)

        const response = await fetch(
          `/api/documents/${encodeURIComponent(docId)}?format=json`,
          {
            headers: {
              'Authorization': "0dd3d1f572e9367974c2a80030a8f0d9de7906d31236a352369162ad0a311c98",
            }
          }
        )

        if (!response.ok) {
          throw new Error('Failed to load document')
        }

        const newProvider = new TiptapCollabProvider({
          name: docId,
          appId: 'zk5qw40k',
          token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MzQ4MjA2MDQsIm5iZiI6MTczNDgyMDYwNCwiZXhwIjoxNzM0OTA3MDA0LCJpc3MiOiJodHRwczovL2Nsb3VkLnRpcHRhcC5kZXYiLCJhdWQiOiJ6azVxdzQwayJ9.BIiIhEBpY_J81jzYtOuIhgq6UliHJ340w7iPwo0Sp6I',
          document: newDoc,
        })
        
        setProvider(newProvider)
        setIsLoading(false)

        return () => {
          if (newProvider) {
            newProvider.destroy()
          }
          newDoc.destroy()
        }
      } catch (error) {
        console.error('Error initializing document:', error)
        setIsLoading(false)
      }
    }

    initDocument()

    return () => {
      if (provider) {
        provider.destroy()
      }
      if (doc) {
        doc.destroy()
      }
    }
  }, [docId])

  const handleSave = async () => {
    try {
      const content = editor.getJSON()
      
      const response = await fetch(
        `/api/documents/${encodeURIComponent(docId)}?format=json`,
        {
          method: 'PUT',
          headers: {
            'Authorization': "0dd3d1f572e9367974c2a80030a8f0d9de7906d31236a352369162ad0a311c98",
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(content)
        }
      )

      if (!response.ok) {
        throw new Error('Failed to save document')
      }

      toast.success('Document saved successfully!')
      navigate('/documents')
    } catch (error) {
      console.error('Save error:', error)
      toast.error('Failed to save document')
    }
  }

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Strike,
      Underline,
      Heading.configure({
        levels: [1, 2]
      }),
      doc && Collaboration.configure({
        document: doc,
      }),
      provider && CollaborationCursor.configure({
        provider: provider,
        user: {
          name: 'User ' + Math.floor(Math.random() * 100),
          color: getRandomColor(),
        },
      }),
    ].filter(Boolean),
    editable: !isReadOnly,
  }, [provider, isLoading, doc])

  if (isLoading || !editor || !doc) {
    return <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white z-50 pt-16">
      Loading document...
    </div>
  }

  return (
    <div className="fixed top-16 left-0 right-0 bottom-0 overflow-auto bg-white">
      <div className="editor-wrapper max-w-4xl mx-auto px-4 py-8">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
        {!isReadOnly && (
          <button onClick={handleSave} className="save-button mt-4">Save</button>
        )}
      </div>
    </div>
  )
}

export default Editor 