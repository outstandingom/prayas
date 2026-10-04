import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'

function localApiPlugin(): Plugin {
  const dataDir = path.resolve(__dirname, './local_data')
  const volunteersJsonPath = path.resolve(dataDir, 'volunteers.json')
  const contactsJsonPath = path.resolve(dataDir, 'contacts.json')

  // Ensure directory exists
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }

  // Seed default files if not present
  const seedFileIfMissing = (filePath: string, defaultSrcPath: string) => {
    if (!fs.existsSync(filePath)) {
      if (fs.existsSync(defaultSrcPath)) {
        fs.copyFileSync(defaultSrcPath, filePath)
      } else {
        fs.writeFileSync(filePath, '[]', 'utf-8')
      }
    }
  }

  seedFileIfMissing(volunteersJsonPath, path.resolve(__dirname, './src/data/volunteers.json'))
  seedFileIfMissing(contactsJsonPath, path.resolve(__dirname, './src/data/contacts.json'))

  const readFile = (filePath: string) => {
    try {
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf-8')
        return JSON.parse(raw)
      }
    } catch (e) {
      console.error(`Error reading ${filePath}:`, e)
    }
    return []
  }

  const writeFile = (filePath: string, data: any) => {
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
      return true
    } catch (e) {
      console.error(`Error writing ${filePath}:`, e)
      return false
    }
  }

  return {
    name: 'local-api-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const isVolunteers = req.url?.startsWith('/api/volunteers')
        const isContacts = req.url?.startsWith('/api/contacts')

        if (!isVolunteers && !isContacts) {
          return next()
        }

        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

        if (req.method === 'OPTIONS') {
          res.statusCode = 204
          res.end()
          return
        }

        const currentJsonPath = isVolunteers ? volunteersJsonPath : contactsJsonPath

        if (req.method === 'GET') {
          const list = readFile(currentJsonPath)
          res.statusCode = 200
          res.end(JSON.stringify(list))
          return
        }

        if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
          let bodyStr = ''
          req.on('data', (chunk) => {
            bodyStr += chunk
          })
          req.on('end', () => {
            try {
              const body = bodyStr ? JSON.parse(bodyStr) : {}
              const list = readFile(currentJsonPath)

              // 1. Delete action
              if (body.action === 'delete' && body.id) {
                const updated = list.filter((item: any) => item.id !== body.id)
                writeFile(currentJsonPath, updated)
                res.statusCode = 200
                res.end(JSON.stringify({ success: true, data: updated }))
                return
              }

              // 2. Update status action
              if (body.action === 'update_status' && body.id) {
                const updated = list.map((item: any) =>
                  item.id === body.id ? { ...item, status: body.status } : item
                )
                writeFile(currentJsonPath, updated)
                res.statusCode = 200
                res.end(JSON.stringify({ success: true, data: updated }))
                return
              }

              // 3. Create new record
              if (isVolunteers) {
                const newApp = {
                  id: `vol-${Date.now()}`,
                  full_name: body.full_name || '',
                  email: body.email || '',
                  phone: body.phone || '',
                  address: body.address || 'Indore, MP',
                  availability: body.availability || 'Flexible',
                  skills: body.skills || 'General Volunteering',
                  message: body.message || '',
                  status: 'pending',
                  created_at: new Date().toISOString(),
                }
                const updatedList = [newApp, ...list]
                writeFile(currentJsonPath, updatedList)
                res.statusCode = 201
                res.end(JSON.stringify({ success: true, data: newApp, list: updatedList }))
                return
              }

              if (isContacts) {
                const newContact = {
                  id: `msg-${Date.now()}`,
                  name: body.name || '',
                  email: body.email || '',
                  phone: body.phone || null,
                  subject: body.subject || 'General Inquiry',
                  message: body.message || '',
                  status: 'unread',
                  created_at: new Date().toISOString(),
                }
                const updatedList = [newContact, ...list]
                writeFile(currentJsonPath, updatedList)
                res.statusCode = 201
                res.end(JSON.stringify({ success: true, data: newContact, list: updatedList }))
                return
              }
            } catch (err: any) {
              res.statusCode = 400
              res.end(JSON.stringify({ error: err?.message || 'Invalid payload' }))
            }
          })
          return
        }

        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), localApiPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    watch: {
      ignored: ['**/local_data/**', '**/src/data/*.json', '**/*.json'],
    },
    allowedHosts: [
      'ae1a-2409-40c4-11c1-75f9-a4b2-a05c-6e7-d221.ngrok-free.app',
      '.ngrok-free.app',
      '.ngrok.io',
    ],
  },
})
