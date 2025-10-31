// ===================================
// CMSQL.com - Interactive Animations
// ===================================

document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href'))
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    })
  })

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1'
        entry.target.style.transform = 'translateY(0)'
      }
    })
  }, observerOptions)

  // Observe value cards
  document.querySelectorAll('.value-card').forEach((card, index) => {
    card.style.opacity = '0'
    card.style.transform = 'translateY(30px)'
    card.style.transition = `all 0.6s ease ${index * 0.2}s`
    observer.observe(card)
  })

  // Observe showcase section
  const showcase = document.querySelector('.showcase-content')
  if (showcase) {
    showcase.style.opacity = '0'
    showcase.style.transform = 'translateY(30px)'
    showcase.style.transition = 'all 0.8s ease'
    observer.observe(showcase)
  }

  // Observe contact section
  const contactBox = document.querySelector('.contact-box')
  if (contactBox) {
    contactBox.style.opacity = '0'
    contactBox.style.transform = 'translateY(30px)'
    contactBox.style.transition = 'all 0.8s ease'
    observer.observe(contactBox)
  }

  // Add parallax effect to hero section
  let ticking = false

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset
        const hero = document.querySelector('.hero')
        const floatingElements = document.querySelectorAll('.sql-element')

        if (hero && scrolled < window.innerHeight) {
          hero.style.transform = `translateY(${scrolled * 0.5}px)`
          hero.style.opacity = 1 - scrolled / window.innerHeight
        }

        floatingElements.forEach((element, index) => {
          const speed = 0.3 + index * 0.1
          element.style.transform = `translateY(${scrolled * speed}px)`
        })

        ticking = false
      })

      ticking = true
    }
  })

  // Add cursor glow effect
  const cursorGlow = document.createElement('div')
  cursorGlow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 217, 255, 0.15), transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    opacity: 0;
  `
  document.body.appendChild(cursorGlow)

  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px'
    cursorGlow.style.top = e.clientY + 'px'
    cursorGlow.style.opacity = '1'
  })

  document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0'
  })

  // Add button ripple effect
  document
    .querySelectorAll('.btn-primary, .btn-sedo, .btn-contact')
    .forEach((button) => {
      button.addEventListener('click', function (e) {
        const ripple = document.createElement('span')
        const rect = this.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height)
        const x = e.clientX - rect.left - size / 2
        const y = e.clientY - rect.top - size / 2

        ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        left: ${x}px;
        top: ${y}px;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `

        this.style.position = 'relative'
        this.style.overflow = 'hidden'
        this.appendChild(ripple)

        setTimeout(() => ripple.remove(), 600)
      })
    })

  // Add ripple animation
  const style = document.createElement('style')
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `
  document.head.appendChild(style)

  // Add typing effect to tagline (optional enhancement)
  const tagline = document.querySelector('.tagline')
  if (tagline) {
    const text = tagline.textContent
    tagline.textContent = ''
    tagline.style.opacity = '1'

    let index = 0
    const typeSpeed = 50

    function type() {
      if (index < text.length) {
        tagline.textContent += text.charAt(index)
        index++
        setTimeout(type, typeSpeed)
      }
    }

    // Uncomment to enable typing effect
    // setTimeout(type, 1000);
  }

  // Add value card hover interactions
  document.querySelectorAll('.value-card').forEach((card) => {
    card.addEventListener('mouseenter', function () {
      this.style.zIndex = '10'
    })

    card.addEventListener('mouseleave', function () {
      this.style.zIndex = '1'
    })
  })

  // Track clicks on CTA buttons for analytics (placeholder)
  document.querySelectorAll('a[href*="sedo.com"]').forEach((link) => {
    link.addEventListener('click', () => {
      console.log('Sedo link clicked - User interested in purchasing')
      // Add your analytics tracking here
    })
  })

  document.querySelectorAll('a[href^="mailto"]').forEach((link) => {
    link.addEventListener('click', () => {
      console.log('Email link clicked - User wants to contact owner')
      // Add your analytics tracking here
    })
  })

  // Add 3D tilt effect to value cards
  document.querySelectorAll('.value-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    })

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) rotateX(0) rotateY(0)'
    })
  })

  // Console message for developers
  console.log(
    '%c🚀 CMSQL.com - Premium Domain',
    'color: #00d9ff; font-size: 20px; font-weight: bold;'
  )
  console.log(
    '%cInterested in acquiring this domain? Contact: ahmad0abdulmajid@gmail.com',
    'color: #8892b0; font-size: 14px;'
  )
})

// Performance optimization: Lazy load images if any are added later
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.add('loaded')
        imageObserver.unobserve(img)
      }
    })
  })

  document.querySelectorAll('img[data-src]').forEach((img) => {
    imageObserver.observe(img)
  })
}
