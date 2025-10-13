import './App.css'
import { useEffect, useMemo, useState } from 'react'

type Offering = {
  _id: string
  title: string
  description: string
  type: '1:1 Call' | 'Priority DM' | 'Package'
  price: number
  originalPrice?: number
  duration?: string
  popular: boolean
  userId: {
    _id: string
    firstName: string
    lastName: string
    profileImage?: string
  }
}

type Testimonial = { 
  _id: string
  text: string
  rating: number
  authorName: string
  authorTitle?: string
  isAnonymous: boolean
  userId: {
    _id: string
    firstName: string
    lastName: string
    profileImage?: string
  }
}

type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  bio?: string
  socialLinks?: {
    linkedin?: string
    instagram?: string
    twitter?: string
  }
}

const TABS = ['All', '1:1 Call', 'Priority DM', 'Package'] as const

export default function App() {
  const [offerings, setOfferings] = useState<Offering[]>([])
  const [tab, setTab] = useState<(typeof TABS)[number]>('All')
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [ratings, setRatings] = useState<{ average: number; count: number; testimonialsCount: number }>()
  const [showModal, setShowModal] = useState(false)
  const [currentPage, setCurrentPage] = useState<'portfolio' | 'signup' | 'onboarding'>('portfolio')
  const [onboardingStep, setOnboardingStep] = useState(1)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [onboardingData, setOnboardingData] = useState({
    socialLink: '',
    pageLink: '',
    country: 'us',
    currency: 'usd',
    expertise: [] as string[],
    services: [] as string[],
    availability: {} as Record<string, { enabled: boolean; slots: { start: string; end: string }[] }>,
    whatsappNumber: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [offeringsRes, testimonialsRes, ratingsRes] = await Promise.all([
          fetch('/api/offerings'),
          fetch('/api/testimonials'),
          fetch('/api/ratings')
        ])
        
        if (!offeringsRes.ok || !testimonialsRes.ok || !ratingsRes.ok) {
          throw new Error('Failed to fetch data')
        }
        
        const [offeringsData, testimonialsData, ratingsData] = await Promise.all([
          offeringsRes.json(),
          testimonialsRes.json(),
          ratingsRes.json()
        ])
        
        setOfferings(offeringsData)
        setTestimonials(testimonialsData)
        setRatings(ratingsData)
        setError(null)
      } catch (err) {
        setError('Failed to load data. Please try again.')
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  const filtered = useMemo(() => {
    if (tab === 'All') return offerings
    return offerings.filter(o => o.type === tab)
  }, [offerings, tab])

  const validateForm = () => {
    const errors: Record<string, string> = {}
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required'
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required'
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid'
    }
    
    if (!formData.password) {
      errors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed')
      }
      
      // Store token and user data
      localStorage.setItem('token', data.token)
      setUser(data.user)
      
      // Redirect to onboarding
      setCurrentPage('onboarding')
      setOnboardingStep(1)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  const signupTestimonials = [
    {
      text: "Love the integrations with Calendar, Zoom and WhatsApp. Makes my life easier!",
      name: "Aishwarya Srinivasan",
      title: "LinkedIn Top Voice"
    },
    {
      text: "All my monetisation now happens in one place",
      name: "Payal & Gaurav", 
      title: "110K+ on Instagram"
    },
    {
      text: "Topmate is my go-to platform for scheduling 1:1 sessions and hosting webinars!",
      name: "Xinran Waibel",
      title: "Founder of Data Engineer Things"
    },
    {
      text: "I love Topmate! It has made it seamless to schedule mentoring sessions! Big fan of Topmate's WhatsApp integration.",
      name: "Jessica",
      title: "Global Data Lead in Energy Industry"
    },
    {
      text: "The team is extremely helpful and cares a lot about feedback. They keep rolling out new features.",
      name: "Sarah Chen",
      title: "Tech Influencer"
    },
    {
      text: "The entire experience is just so seamless. My followers love it",
      name: "Mike Johnson",
      title: "Content Creator"
    }
  ]

  const renderOnboardingStep = () => {
    switch (onboardingStep) {
      case 1:
        return (
          <div className="onboarding-container">
            <div className="progress-bar">
              <div className="progress-line"></div>
              <div className="progress-dot active"></div>
              <div className="progress-dot"></div>
              <div className="progress-dot"></div>
              <div className="progress-dot final">🚀</div>
            </div>
            
            <div className="onboarding-content">
              <h1 className="onboarding-title">Hello there!</h1>
              <p className="onboarding-subtitle">In a few moments you will be ready to share your expertise & time</p>
              
              <div className="form-section">
                <div className="form-group">
                  <label>Connect your social account</label>
                  <div className="input-with-prefix">
                    <span className="prefix">https://</span>
                    <input 
                      type="text" 
                      placeholder="LinkedIn, Twitter, Instagram"
                      value={onboardingData.socialLink}
                      onChange={(e) => setOnboardingData(prev => ({ ...prev, socialLink: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Your topmate page link</label>
                  <div className="input-with-prefix">
                    <span className="prefix">topmate.io/</span>
                    <input 
                      type="text" 
                      value={onboardingData.pageLink}
                      onChange={(e) => setOnboardingData(prev => ({ ...prev, pageLink: e.target.value }))}
                    />
                    <span className="checkmark">✓</span>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Country</label>
                    <select 
                      value={onboardingData.country}
                      onChange={(e) => setOnboardingData(prev => ({ ...prev, country: e.target.value }))}
                    >
                      <option value="us">🇺🇸 United States</option>
                      <option value="in">🇮🇳 India</option>
                      <option value="uk">🇬🇧 United Kingdom</option>
                      <option value="ca">🇨🇦 Canada</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Currency</label>
                    <select 
                      value={onboardingData.currency}
                      onChange={(e) => setOnboardingData(prev => ({ ...prev, currency: e.target.value }))}
                    >
                      <option value="usd">$ (U.S dollars)</option>
                      <option value="inr">₹ (Indian Rupees)</option>
                      <option value="gbp">£ (British Pounds)</option>
                      <option value="cad">$ (Canadian Dollars)</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Select your expertise</label>
                  <div className="expertise-grid">
                    {['Cybersecurity', 'Law', 'Content & Branding', 'Others', 'HR', 'Software', 'Product', 'Study Abroad', 'Finance', 'Design'].map(expertise => (
                      <button
                        key={expertise}
                        className={`expertise-btn ${onboardingData.expertise.includes(expertise) ? 'selected' : ''}`}
                        onClick={() => {
                          const newExpertise = onboardingData.expertise.includes(expertise)
                            ? onboardingData.expertise.filter(e => e !== expertise)
                            : [...onboardingData.expertise, expertise]
                          setOnboardingData(prev => ({ ...prev, expertise: newExpertise }))
                        }}
                      >
                        {expertise}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="onboarding-footer">
              <button className="next-btn" onClick={() => setOnboardingStep(2)}>
                Next
              </button>
            </div>
          </div>
        )
        
      case 2:
        return (
          <div className="onboarding-container">
            <div className="progress-bar">
              <div className="progress-line"></div>
              <div className="progress-dot completed"></div>
              <div className="progress-dot active"></div>
              <div className="progress-dot"></div>
              <div className="progress-dot final">🚀</div>
            </div>
            
            <div className="onboarding-content">
              <h1 className="onboarding-title">Let's add some services</h1>
              <p className="onboarding-subtitle">We'll help you get set up based on your expertise</p>
              <p className="section-subtitle">Popular <strong>1:1 services</strong> in your expertise</p>
              
              <div className="services-grid">
                {['Quick chat', 'Mock interview', 'Interview prep & tips', 'Resume review', 'Career guidance', '1:1 Mentorship', 'Discovery Call'].map(service => (
                  <button
                    key={service}
                    className={`service-btn ${onboardingData.services.includes(service) ? 'selected' : ''}`}
                    onClick={() => {
                      const newServices = onboardingData.services.includes(service)
                        ? onboardingData.services.filter(s => s !== service)
                        : [...onboardingData.services, service]
                      setOnboardingData(prev => ({ ...prev, services: newServices }))
                    }}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="onboarding-footer">
              <button className="back-btn" onClick={() => setOnboardingStep(1)}>←</button>
              <button className="next-btn" onClick={() => setOnboardingStep(3)}>
                Next
              </button>
            </div>
          </div>
        )
        
      case 3:
        return (
          <div className="onboarding-container">
            <div className="progress-bar">
              <div className="progress-line"></div>
              <div className="progress-dot completed"></div>
              <div className="progress-dot completed"></div>
              <div className="progress-dot active"></div>
              <div className="progress-dot final">🚀</div>
              <span className="skip-link">Skip</span>
            </div>
            
            <div className="onboarding-content">
              <h1 className="onboarding-title">Great! Now let's set your availability</h1>
              <p className="onboarding-subtitle">Let your audience know when you're available. You can edit this later.</p>
              
              <div className="availability-section">
                {['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                  <div key={day} className="availability-day">
                    <div className="day-header">
                      <input
                        type="checkbox"
                        id={day}
                        checked={onboardingData.availability[day]?.enabled || false}
                        onChange={(e) => {
                          const newAvailability = { ...onboardingData.availability }
                          if (e.target.checked) {
                            newAvailability[day] = {
                              enabled: true,
                              slots: [{ start: '9:00 AM', end: '8:00 PM' }]
                            }
                          } else {
                            delete newAvailability[day]
                          }
                          setOnboardingData(prev => ({ ...prev, availability: newAvailability }))
                        }}
                      />
                      <label htmlFor={day}>{day}</label>
                    </div>
                    
                    {onboardingData.availability[day]?.enabled ? (
                      <div className="time-slots">
                        {onboardingData.availability[day].slots.map((slot, index) => (
                          <div key={index} className="time-slot">
                            <select
                              value={slot.start}
                              onChange={(e) => {
                                const newAvailability = { ...onboardingData.availability }
                                newAvailability[day].slots[index].start = e.target.value
                                setOnboardingData(prev => ({ ...prev, availability: newAvailability }))
                              }}
                            >
                              <option value="9:00 AM">9:00 AM</option>
                              <option value="10:00 AM">10:00 AM</option>
                              <option value="11:00 AM">11:00 AM</option>
                              <option value="12:00 PM">12:00 PM</option>
                              <option value="1:00 PM">1:00 PM</option>
                              <option value="2:00 PM">2:00 PM</option>
                              <option value="3:00 PM">3:00 PM</option>
                              <option value="4:00 PM">4:00 PM</option>
                              <option value="5:00 PM">5:00 PM</option>
                              <option value="6:00 PM">6:00 PM</option>
                              <option value="7:00 PM">7:00 PM</option>
                              <option value="8:00 PM">8:00 PM</option>
                            </select>
                            <span>-</span>
                            <select
                              value={slot.end}
                              onChange={(e) => {
                                const newAvailability = { ...onboardingData.availability }
                                newAvailability[day].slots[index].end = e.target.value
                                setOnboardingData(prev => ({ ...prev, availability: newAvailability }))
                              }}
                            >
                              <option value="5:00 PM">5:00 PM</option>
                              <option value="6:00 PM">6:00 PM</option>
                              <option value="7:00 PM">7:00 PM</option>
                              <option value="8:00 PM">8:00 PM</option>
                              <option value="9:00 PM">9:00 PM</option>
                              <option value="10:00 PM">10:00 PM</option>
                            </select>
                            <button className="add-slot-btn">+</button>
                          </div>
                        ))}
                        {day === 'Saturday' && (
                          <button className="apply-all-btn">Apply To All</button>
                        )}
                      </div>
                    ) : (
                      <span className="unavailable">Unavailable</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="onboarding-footer">
              <button className="back-btn" onClick={() => setOnboardingStep(2)}>←</button>
              <button className="next-btn" onClick={() => setOnboardingStep(4)}>
                Next
              </button>
            </div>
          </div>
        )
        
      case 4:
        return (
          <div className="onboarding-container">
            <div className="progress-bar">
              <div className="progress-line"></div>
              <div className="progress-dot completed"></div>
              <div className="progress-dot completed"></div>
              <div className="progress-dot completed"></div>
              <div className="progress-dot final active">🚀</div>
            </div>
            
            <div className="onboarding-content">
              <h1 className="onboarding-title">Alright! One last thing</h1>
              
              <div className="form-section">
                <div className="form-group">
                  <label>WhatsApp number</label>
                  <div className="phone-input">
                    <select className="country-select">
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+1">🇨🇦 +1</option>
                    </select>
                    <input 
                      type="tel" 
                      placeholder="Enter your WhatsApp number"
                      value={onboardingData.whatsappNumber}
                      onChange={(e) => setOnboardingData(prev => ({ ...prev, whatsappNumber: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div className="whatsapp-promo">
                  <div className="promo-left">
                    <div className="promo-item">
                      <span className="promo-icon">📅</span>
                      <span>Bookings</span>
                    </div>
                    <div className="promo-item">
                      <span className="promo-icon">⏰</span>
                      <span>Reminders</span>
                    </div>
                  </div>
                  
                  <div className="promo-center">
                    <div className="phone-mockup">
                      <div className="phone-screen">
                        <div className="chat-message">
                          <p>Hi Yash, Your call with Ankit for Portfolio Review starts in 10 mins. Hope you have a great time.</p>
                          <div className="chat-buttons">
                            <button>Join Call</button>
                            <button>Reschedule</button>
                          </div>
                          <span className="chat-time">11:14 AM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="promo-right">
                    <p>Add your WhatsApp number to get booking updates and reminder.</p>
                    <p className="testimonial">97% users love the integration!</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="onboarding-footer">
              <button className="back-btn" onClick={() => setOnboardingStep(3)}>←</button>
              <button className="launch-btn" onClick={() => setCurrentPage('portfolio')}>
                🚀 Launch your page
              </button>
            </div>
          </div>
        )
        
      default:
        return null
    }
  }

  if (currentPage === 'onboarding') {
    return renderOnboardingStep()
  }

  if (currentPage === 'signup') {
  return (
      <div className="signup-container">
        <header className="signup-header">
          <div className="logo">
            <div className="logo-icon">▶</div>
            <span>topmate</span>
          </div>
          <button className="login-btn">Login</button>
        </header>
        
        <div className="signup-content">
          <div className="signup-form-section">
            <h1 className="signup-title">Sign Up</h1>
            <p className="signup-subtitle">Launch your page in no time!</p>
            
            <div className="social-buttons">
              <button className="social-btn google">
                <span className="google-icon">G</span>
                Continue with Google
              </button>
              <button className="social-btn linkedin">
                <span className="linkedin-icon">in</span>
                Continue with LinkedIn
              </button>
            </div>
            
            <div className="separator">
              <span>or</span>
            </div>
            
            <form className="signup-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>First Name</label>
                <input 
                  type="text" 
                  name="firstName"
                  placeholder="First name" 
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={formErrors.firstName ? 'error' : ''}
                />
                {formErrors.firstName && <span className="error-text">{formErrors.firstName}</span>}
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input 
                  type="text" 
                  name="lastName"
                  placeholder="Last name" 
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={formErrors.lastName ? 'error' : ''}
                />
                {formErrors.lastName && <span className="error-text">{formErrors.lastName}</span>}
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  className={formErrors.email ? 'error' : ''}
                />
                {formErrors.email && <span className="error-text">{formErrors.email}</span>}
              </div>
              <div className="form-group">
                <label>Password</label>
                <div className="password-input">
                  <input 
                    type="password" 
                    name="password"
                    placeholder="Password" 
                    value={formData.password}
                    onChange={handleInputChange}
                    className={formErrors.password ? 'error' : ''}
                  />
                  <span className="eye-icon">👁</span>
                </div>
                {formErrors.password && <span className="error-text">{formErrors.password}</span>}
              </div>
              {error && <div className="error-message">{error}</div>}
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Creating Account...' : 'Get Started'}
              </button>
            </form>
          </div>
          
          <div className="testimonials-section">
            {signupTestimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="quote-icon">"</div>
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="testimonial-author">
                  <div className="author-avatar"></div>
                  <div className="author-info">
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-title">{testimonial.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <aside className="sidebar">
        <div className="avatar" />
        <h1 className="name">Your Name</h1>
        <p className="subtitle">Your Role • Company</p>
        <div className="badges">
          <span className="badge">Popular</span>
          <span className="badge">Top 1%</span>
          <span className="badge">Community care</span>
        </div>
        <button className="cta" onClick={() => setCurrentPage('signup')}>Start your page</button>
      </aside>

      <main className="content">
        <div className="tabs">
          {TABS.map(t => (
            <button key={t} className={t === tab ? 'tab active' : 'tab'} onClick={() => setTab(t)}>
              {t}
        </button>
          ))}
        </div>

        <section className="grid">
          {loading ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
              <div style={{ fontSize: '18px', color: 'var(--muted)' }}>Loading offerings...</div>
            </div>
          ) : error ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
              <div style={{ fontSize: '18px', color: 'var(--error)' }}>{error}</div>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
              <div style={{ fontSize: '18px', color: 'var(--muted)' }}>No offerings found</div>
            </div>
          ) : (
            filtered.map(o => (
              <article className="card" key={o._id}>
                {o.popular && <span className="chip">Popular</span>}
                <h3>{o.title}</h3>
                {o.description && <p style={{ color: 'var(--muted)', fontSize: '14px', margin: '0 0 16px' }}>{o.description}</p>}
                <div className="meta">
                  <span>{o.type}</span>
                  <span className="price">${o.price}</span>
                </div>
              </article>
            ))
          )}
        </section>

        <section className="ratings">
          <div className="tile" />
          <div className="tile center">
            <div className="avg">{ratings ? ratings.average.toFixed(1) : '-'}/5</div>
            <div className="sub">{ratings?.count ?? 0} RATINGS</div>
          </div>
          <div className="tile center">
            <div className="avg">{ratings?.testimonialsCount ?? 0}</div>
            <div className="sub">TESTIMONIALS</div>
          </div>
        </section>

        <section className="testimonials">
          {testimonials.slice(0, 2).map(t => (
            <article className="tcard" key={t._id}>
              <div className="stars">★ {t.rating}/5</div>
              <p>{t.text}</p>
              <div className="author">{t.authorName}</div>
            </article>
          ))}
          <button className="showAll" onClick={() => setShowModal(true)}>Show all reviews</button>
        </section>

        <section className="about">
          <h2>About me</h2>
          <p>
            Short bio about your experience and what you offer. Add links to
            your socials below.
          </p>
          <div className="socials">
            <a href="#" aria-label="LinkedIn" className="social">in</a>
            <a href="#" aria-label="Instagram" className="social">ig</a>
          </div>
        </section>
      </main>

      {showModal && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modalContent">
            <div className="modalHeader">
              <strong>{testimonials.length} testimonials</strong>
              <button onClick={() => setShowModal(false)} className="close">✕</button>
            </div>
            <div className="modalBody">
              {testimonials.map(t => (
                <article className="tcard" key={t._id}>
                  <div className="stars">★ {t.rating}/5</div>
                  <p>{t.text}</p>
                  <div className="author">{t.authorName}</div>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}
      </div>
  )
}

