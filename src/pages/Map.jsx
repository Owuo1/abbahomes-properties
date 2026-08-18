import React from 'react'
import { Link } from 'react-router-dom'
import { 
  FaChartLine, 
  FaBuilding, 
  FaHome, 
  FaStore, 
  FaWater, 
  FaRoad, 
  FaUniversity, 
  FaUsers, 
  FaTree, 
  FaShieldAlt,
  FaPlane,
  FaHospital,
  FaSchool,
  FaBriefcase,
  FaCity
} from 'react-icons/fa'

const Map = () => {
  const reasons = [
    {
      icon: <FaWater size={40} />,
      title: 'Lake Victoria Frontage',
      description: 'Homa Bay County boasts prime shoreline along Lake Victoria, the largest lake in Africa. This offers unparalleled opportunities for beachfront properties, resorts, and tourism-related investments that are scarce elsewhere in Kenya.',
      color: '#1a5276',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600',
      imageAlt: 'Lake Victoria shoreline'
    },
    {
      icon: <FaChartLine size={40} />,
      title: 'Rapid Urbanization',
      description: 'Homa Bay Town is experiencing unprecedented growth with new roads, modern buildings, and expanding infrastructure. Property values have appreciated 200-300% in the last 5 years, making it a prime investment destination for early movers.',
      color: '#e67e22',
      image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600',
      imageAlt: 'Modern city development'
    },
    {
      icon: <FaUniversity size={40} />,
      title: 'Educational Hub',
      description: 'Home to Tom Mboya University, several teacher training colleges, and numerous secondary schools. The student population creates consistent demand for rental housing, boarding facilities, and commercial spaces.',
      color: '#8e44ad',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600',
      imageAlt: 'University campus'
    },
    {
      icon: <FaHospital size={40} />,
      title: 'Growing Healthcare Sector',
      description: 'With the expansion of Homa Bay County Referral Hospital and emerging private healthcare facilities, there is a growing demand for medical-related real estate including clinics, pharmacies, and staff housing.',
      color: '#27ae60',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600',
      imageAlt: 'Modern hospital building'
    },
    {
      icon: <FaRoad size={40} />,
      title: 'Improving Infrastructure',
      description: 'The county is benefiting from national government investments in roads (Kisumu-Homa Bay highway), electricity extension, and water projects. These developments are making once-remote areas accessible and valuable.',
      color: '#2980b9',
      image: 'https://images.unsplash.com/photo-1570641963307-e4a8fe54d5b5?w=600',
      imageAlt: 'Modern highway infrastructure'
    },
    {
      icon: <FaTree size={40} />,
      title: 'Untapped Agricultural Potential',
      description: 'Rich volcanic soils and favorable climate make Homa Bay ideal for farming. This attracts agri-business investors who need storage facilities, processing plants, and worker accommodation — creating diverse real estate opportunities.',
      color: '#2ecc71',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600',
      imageAlt: 'Agricultural landscape'
    }
  ]

  const investmentOpportunities = [
    {
      icon: <FaBuilding />,
      title: 'Apartment Complexes',
      description: 'Rising population and urbanization are driving high demand for modern apartments. Rental yields average 8-12% annually in prime locations like Homa Bay Town and Kendu Bay.',
      link: '/properties'
    },
    {
      icon: <FaHome />,
      title: 'Residential Houses',
      description: 'Affordable housing is a government priority. Building residential homes in growing neighborhoods offers guaranteed returns with increasing property values and steady rental income.',
      link: '/properties'
    },
    {
      icon: <FaStore />,
      title: 'Commercial Shops',
      description: 'The growing middle class is demanding retail spaces. Strategic locations near markets, schools, and transport hubs offer strong foot traffic and consistent rental income.',
      link: '/properties'
    },
    {
      icon: <FaBriefcase />,
      title: 'Land Banking',
      description: 'Purchasing land now in developing corridors yields significant returns. Areas near the new roads and planned infrastructure are prime for appreciation. Your investment can double within 3-5 years.',
      link: '/properties'
    }
  ]

  return (
    <section style={{ 
      padding: '80px 20px', 
      background: 'white',
      marginTop: '20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
            color: '#1a1a2e',
            marginBottom: '1rem'
          }}>
            Why <span style={{ color: '#e67e22' }}>Homa Bay</span>?
          </h1>
          <p style={{ 
            fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', 
            color: '#666',
            maxWidth: '750px',
            margin: '0 auto',
            lineHeight: 1.8
          }}>
            Discover why Homa Bay County is Kenya's next big real estate frontier — 
            where opportunity meets strategic growth.
          </p>
        </div>

        {/* Reasons Grid with Images */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
          gap: '30px',
          marginBottom: '60px'
        }}>
          {reasons.map((reason, index) => (
            <div 
              key={index}
              style={{
                background: '#ffffff',
                borderRadius: '15px',
                overflow: 'hidden',
                borderTop: `6px solid ${reason.color}`,
                boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)'
              }}
            >
              {/* Image */}
              <div style={{
                width: '100%',
                height: '220px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <img 
                  src={reason.image} 
                  alt={reason.imageAlt}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '60px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <div style={{ 
                    color: 'white',
                    fontSize: '1.5rem',
                    background: 'rgba(0,0,0,0.3)',
                    padding: '8px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {reason.icon}
                  </div>
                  <h3 style={{ 
                    color: 'white',
                    fontSize: '1.2rem',
                    margin: 0,
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                  }}>
                    {reason.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '20px' }}>
                <p style={{ 
                  color: '#555',
                  lineHeight: 1.7,
                  fontSize: '0.95rem',
                  margin: 0
                }}>
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Investment Opportunities Section */}
        <div style={{ 
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          color: 'white',
          padding: '60px 40px',
          borderRadius: '20px',
          marginBottom: '60px'
        }}>
          <h2 style={{ 
            fontSize: 'clamp(2rem, 4vw, 2.8rem)', 
            textAlign: 'center',
            marginBottom: '1rem'
          }}>
            Investment <span style={{ color: '#e67e22' }}>Opportunities</span>
          </h2>
          <p style={{ 
            textAlign: 'center',
            opacity: 0.9,
            fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
            marginBottom: '3rem',
            maxWidth: '700px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Four proven ways to maximize your returns in Homa Bay County
          </p>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '30px'
          }}>
            {investmentOpportunities.map((item, index) => (
              <div 
                key={index}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  padding: '30px',
                  borderRadius: '15px',
                  textAlign: 'center',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'transform 0.3s ease, background 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                }}
              >
                <div style={{ 
                  fontSize: '2.5rem', 
                  color: '#e67e22',
                  marginBottom: '15px'
                }}>
                  {item.icon}
                </div>
                <h3 style={{ 
                  fontSize: '1.3rem', 
                  marginBottom: '10px',
                  color: '#e67e22'
                }}>
                  {item.title}
                </h3>
                <p style={{ 
                  opacity: 0.9,
                  lineHeight: 1.6,
                  fontSize: '0.95rem',
                  marginBottom: '15px'
                }}>
                  {item.description}
                </p>
                <Link to={item.link}>
                  <button style={{
                    background: '#e67e22',
                    color: 'white',
                    border: 'none',
                    padding: '10px 25px',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'background 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#d35400'}
                  onMouseLeave={(e) => e.target.style.background = '#e67e22'}
                  >
                    Explore →
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Market Statistics */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '30px',
          marginBottom: '60px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#e67e22' }}>200%+</div>
            <p style={{ color: '#666', marginTop: '5px' }}>Property value appreciation in 5 years</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#e67e22' }}>8-12%</div>
            <p style={{ color: '#666', marginTop: '5px' }}>Average rental yields</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#e67e22' }}>300K+</div>
            <p style={{ color: '#666', marginTop: '5px' }}>Growing population seeking housing</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#e67e22' }}>10,000+</div>
            <p style={{ color: '#666', marginTop: '5px' }}>New jobs created annually</p>
          </div>
        </div>

        {/* Call to Action */}
        <div style={{ 
          textAlign: 'center',
          padding: '40px 20px',
          background: '#f8f9fa',
          borderRadius: '15px'
        }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.2rem)', color: '#1a1a2e' }}>
            Ready to <span style={{ color: '#e67e22' }}>Invest</span> in Homa Bay?
          </h2>
          <p style={{ 
            color: '#666', 
            maxWidth: '600px', 
            margin: '1rem auto 2rem',
            fontSize: '1.1rem'
          }}>
            Browse our available properties or contact our team for personalized investment guidance.
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/properties">
              <button style={{
                background: '#e67e22',
                color: 'white',
                border: 'none',
                padding: '12px 35px',
                borderRadius: '30px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.background = '#d35400'}
              onMouseLeave={(e) => e.target.style.background = '#e67e22'}
              >
                View Properties
              </button>
            </Link>
            <Link to="/contact">
              <button style={{
                background: 'transparent',
                color: '#e67e22',
                border: '2px solid #e67e22',
                padding: '12px 35px',
                borderRadius: '30px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#e67e22'
                e.target.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent'
                e.target.style.color = '#e67e22'
              }}
              >
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Map
