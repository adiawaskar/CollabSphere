import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/DocumentRepository.css'

const API_SECRET = '0dd3d1f572e9367974c2a80030a8f0d9de7906d31236a352369162ad0a311c98'

const DocumentRepository = () => {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newDocName, setNewDocName] = useState('')

  const fetchDocuments = async () => {
    try {
      const response = await fetch(`/api/documents`, {
        method: 'GET',
        headers: {
          'Authorization': API_SECRET,
        }
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `Failed to fetch documents: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (Array.isArray(data)) {
        setDocuments(data)
      } else if (data && Array.isArray(data.documents)) {
        setDocuments(data.documents)
      } else {
        console.error('Unexpected API response structure:', data)
        setDocuments([])
        setError('Invalid data format received from server')
      }
    } catch (err) {
      console.error('Fetch error:', err)
      setError(err.message)
      setDocuments([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDocuments()
  }, [])

  const createDocument = async (e) => {
    e.preventDefault()
    if (!newDocName.trim()) return

    try {
      const createResponse = await fetch(
        `/api/documents/${encodeURIComponent(newDocName)}?format=json`,
        {
          method: 'POST',
          headers: {
            'Authorization': API_SECRET,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            type: 'doc',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'New document content'
                  }
                ]
              }
            ]
          })
        }
      )

      if (!createResponse.ok) {
        const errorData = await createResponse.json().catch(() => null)
        throw new Error(
          errorData?.message || 
          `Failed to create document (${createResponse.status})`
        )
      }

      await new Promise(resolve => setTimeout(resolve, 1000))

      const verifyResponse = await fetch(
        `/api/documents/${encodeURIComponent(newDocName)}?format=json`,
        {
          headers: {
            'Authorization': API_SECRET,
          }
        }
      )

      if (!verifyResponse.ok) {
        throw new Error('Failed to verify document creation')
      }

      setNewDocName('')
      fetchDocuments()
    } catch (err) {
      console.error('Create document error:', err)
      setError(err.message)
    }
  }

  const deleteDocument = async (docId) => {
    if (!docId) {
      console.error('No document ID provided for deletion')
      return
    }

    if (!window.confirm('Are you sure you want to delete this document?')) return

    try {
      const response = await fetch(`/api/documents/${encodeURIComponent(docId)}`, {
        method: 'DELETE',
        headers: {
          'Authorization': API_SECRET,
        }
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || 'Failed to delete document')
      }
      
      fetchDocuments()
    } catch (err) {
      console.error('Delete error:', err)
      setError(err.message)
    }
  }

  if (loading) {
    return <div className="fixed top-16 left-0 right-0 bottom-0 flex items-center justify-center bg-white">
      Loading documents...
    </div>
  }

  if (error) {
    return (
      <div className="fixed top-16 left-0 right-0 bottom-0 flex items-center justify-center bg-white">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={fetchDocuments}>Retry</button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed top-16 left-0 right-0 bottom-0 overflow-auto bg-white">
      <div className="document-repository max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Project Documents</h1>
        
        <form onSubmit={createDocument} className="create-document-form">
          <input
            type="text"
            value={newDocName}
            onChange={(e) => setNewDocName(e.target.value)}
            placeholder="Enter document name"
            required
            className="border p-2 rounded"
          />
          <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            Create Document
          </button>
        </form>

        <div className="documents-list">
          {Array.isArray(documents) && documents.length === 0 ? (
            <p>No documents found</p>
          ) : (
            Array.isArray(documents) && documents.map((doc, index) => {
              const documentId = doc.name || doc.identifier || doc
              
              return (
                <div key={documentId || `doc-${index}`} className="document-item">
                  <h3>{documentId}</h3>
                  <div className="document-actions">
                    <Link to={`/view/${encodeURIComponent(documentId)}`}>
                      <button className="bg-blue-500 text-white">View</button>
                    </Link>
                    <Link to={`/edit/${encodeURIComponent(documentId)}`}>
                      <button className="bg-green-500 text-white">Edit</button>
                    </Link>
                    <button 
                      onClick={() => deleteDocument(documentId)} 
                      className="bg-red-500 text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default DocumentRepository