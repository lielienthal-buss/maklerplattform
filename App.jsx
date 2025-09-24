import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { Anchor, Search, Filter, Download, RefreshCw, Users, BarChart3, Settings, LogOut, Eye, AlertTriangle } from 'lucide-react'
import './App.css'

import { API_BASE } from './apiConfig';

function App() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    if (token) {
      // Verify token and get user info
      const userData = localStorage.getItem('user')
      if (userData) {
        setUser(JSON.parse(userData))
      }
    }
  }, [token])

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  if (!token || !user) {
    return <AuthPage setToken={setToken} setUser={setUser} />
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation user={user} logout={logout} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/listings" element={<ListingsPage />} />
            <Route path="/saved-searches" element={<SavedSearchesPage />} />
            {user.role === 'admin' && (
              <Route path="/admin" element={<AdminPage />} />
            )}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

function Navigation({ user, logout }) {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Anchor className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">Yacht Platform</h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <a href="/" className="text-gray-600 hover:text-gray-900">Dashboard</a>
            <a href="/listings" className="text-gray-600 hover:text-gray-900">Listings</a>
            <a href="/saved-searches" className="text-gray-600 hover:text-gray-900">Saved Searches</a>
            {user.role === 'admin' && (
              <a href="/admin" className="text-gray-600 hover:text-gray-900">Admin</a>
            )}
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {user.first_name} {user.last_name}
              </span>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

function AuthPage({ setToken, setUser }) {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    company: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register'
      const body = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData

      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('token', data.access_token)
        localStorage.setItem('user', JSON.stringify(data.user))
        setToken(data.access_token)
        setUser(data.user)
      } else {
        setError(data.detail || 'Authentication failed')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Anchor className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Yacht Platform</CardTitle>
          <CardDescription>
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Legal Disclaimer */}
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Diese Plattform nutzt Web-Scraping. Durch die Nutzung stimmen Sie zu, dass Sie die rechtliche Verantwortung für die Einhaltung der Nutzungsbedingungen der gescrapten Websites tragen.
            </AlertDescription>
          </Alert>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>

            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      id="first_name"
                      value={formData.first_name}
                      onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      id="last_name"
                      value={formData.last_name}
                      onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company (Optional)</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>
              </>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Sign Up')}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Dashboard({ user }) {
  const [stats, setStats] = useState(null)
  const [recentListings, setRecentListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token')
      
      // Fetch recent listings
      const listingsResponse = await fetch(`${API_BASE}/listings?limit=5`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const listingsData = await listingsResponse.json()
      setRecentListings(listingsData.listings || [])

      // Fetch stats if admin
      if (user.role === 'admin') {
        const statsResponse = await fetch(`${API_BASE}/admin/stats`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const statsData = await statsResponse.json()
        setStats(statsData)
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const triggerScraping = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_BASE}/scrape`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (response.ok) {
        alert('Scraping started successfully!')
        fetchDashboardData() // Refresh data
      } else {
        alert('Failed to start scraping')
      }
    } catch (error) {
      alert('Error starting scraping')
    }
  }

  const triggerDeduplication = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_BASE}/deduplicate-and-score`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (response.ok) {
        const data = await response.json()
        alert(`Deduplication completed! Found ${data.results.deduplication.duplicates_found} duplicates, scored ${data.results.scoring.scored} listings.`)
        fetchDashboardData() // Refresh data
      } else {
        alert('Failed to start deduplication')
      }
    } catch (error) {
      alert('Error starting deduplication')
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex space-x-2">
          <Button onClick={triggerScraping} className="flex items-center space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>Start Scraping</span>
          </Button>
          <Button onClick={triggerDeduplication} variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Deduplicate & Score</span>
          </Button>
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
              <Anchor className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_listings}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.active_listings}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_users}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.active_users}</div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Recent Listings</CardTitle>
          <CardDescription>Latest yacht listings from all platforms</CardDescription>
        </CardHeader>
        <CardContent>
          {recentListings.length > 0 ? (
            <div className="space-y-4">
              {recentListings.map((listing) => (
                <div key={listing.id} className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{listing.title}</h3>
                    <p className="text-sm text-gray-600">
                      {listing.year} • {listing.length}m • {listing.location}
                    </p>
                    <Badge variant="secondary" className="mt-1">
                      {listing.source_platform}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">
                      {listing.price ? `€${listing.price.toLocaleString()}` : 'Price on request'}
                    </p>
                    <p className="text-sm text-gray-600">Score: {listing.score.toFixed(1)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No listings available. Start scraping to see data.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function ListingsPage() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    brand: '',
    min_price: '',
    max_price: '',
    min_year: '',
    max_year: '',
    location: ''
  })

  useEffect(() => {
    fetchListings()
  }, [])

  const fetchListings = async () => {
    try {
      const token = localStorage.getItem('token')
      const params = new URLSearchParams()
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value)
      })

      const response = await fetch(`${API_BASE}/listings?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      setListings(data.listings || [])
    } catch (error) {
      console.error('Error fetching listings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const applyFilters = () => {
    setLoading(true)
    fetchListings()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Yacht Listings</h1>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div>
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                placeholder="e.g. Bavaria"
                value={filters.brand}
                onChange={(e) => handleFilterChange('brand', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="min_price">Min Price (€)</Label>
              <Input
                id="min_price"
                type="number"
                placeholder="50000"
                value={filters.min_price}
                onChange={(e) => handleFilterChange('min_price', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="max_price">Max Price (€)</Label>
              <Input
                id="max_price"
                type="number"
                placeholder="500000"
                value={filters.max_price}
                onChange={(e) => handleFilterChange('max_price', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="min_year">Min Year</Label>
              <Input
                id="min_year"
                type="number"
                placeholder="2010"
                value={filters.min_year}
                onChange={(e) => handleFilterChange('min_year', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="max_year">Max Year</Label>
              <Input
                id="max_year"
                type="number"
                placeholder="2024"
                value={filters.max_year}
                onChange={(e) => handleFilterChange('max_year', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Hamburg"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4">
            <Button onClick={applyFilters} className="flex items-center space-x-2">
              <Search className="h-4 w-4" />
              <span>Apply Filters</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Listings */}
      <Card>
        <CardHeader>
          <CardTitle>Results ({listings.length} listings)</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : listings.length > 0 ? (
            <div className="space-y-4">
              {listings.map((listing) => (
                <div key={listing.id} className="border rounded-lg p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{listing.title}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                        <div>Year: {listing.year || 'N/A'}</div>
                        <div>Length: {listing.length ? `${listing.length}m` : 'N/A'}</div>
                        <div>Brand: {listing.brand || 'N/A'}</div>
                        <div>Location: {listing.location || 'N/A'}</div>
                      </div>
                      <p className="text-gray-700 mb-3">{listing.description}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{listing.source_platform}</Badge>
                        <Badge variant="outline">Score: {listing.score.toFixed(1)}</Badge>
                        {listing.seller_type && (
                          <Badge variant="outline">{listing.seller_type}</Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right ml-6">
                      <div className="text-2xl font-bold text-blue-600 mb-2">
                        {listing.price ? `€${listing.price.toLocaleString()}` : 'Price on request'}
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={listing.source_url} target="_blank" rel="noopener noreferrer">
                          View Original
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-600">
              No listings found. Try adjusting your filters or start scraping to get data.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function SavedSearchesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Saved Searches</h1>
      <Card>
        <CardContent className="pt-6">
          <p className="text-gray-600">Saved searches functionality will be implemented in the next phase.</p>
        </CardContent>
      </Card>
    </div>
  )
}

function AdminPage() {
  const [users, setUsers] = useState([])
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAdminData()
  }, [])

  const fetchAdminData = async () => {
    try {
      const token = localStorage.getItem('token')
      
      const [usersResponse, logsResponse] = await Promise.all([
        fetch(`${API_BASE}/admin/users`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${API_BASE}/admin/scrape-logs`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ])

      const usersData = await usersResponse.json()
      const logsData = await logsResponse.json()

      setUsers(usersData)
      setLogs(logsData)
    } catch (error) {
      console.error('Error fetching admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleUserStatus = async (userId, isActive) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_BASE}/admin/users/${userId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ is_active: !isActive })
      })

      if (response.ok) {
        fetchAdminData() // Refresh data
      }
    } catch (error) {
      console.error('Error updating user status:', error)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Panel</h1>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="logs">Scrape Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{user.first_name} {user.last_name}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-sm text-gray-600">{user.company}</p>
                      <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                        {user.role}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={user.is_active ? 'default' : 'destructive'}>
                        {user.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleUserStatus(user.id, user.is_active)}
                      >
                        {user.is_active ? 'Deactivate' : 'Activate'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>Scraping Logs</CardTitle>
              <CardDescription>Recent scraping activity and results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {logs.map((log) => (
                  <div key={log.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{log.platform}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(log.started_at).toLocaleString()}
                      </p>
                      {log.error_message && (
                        <p className="text-sm text-red-600">{log.error_message}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <Badge variant={log.status === 'success' ? 'default' : 'destructive'}>
                        {log.status}
                      </Badge>
                      <p className="text-sm text-gray-600 mt-1">
                        {log.listings_found} listings found
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default App

