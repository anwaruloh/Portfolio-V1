const fadeElements = document.querySelectorAll(".fade-up");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.2,
  }
);

fadeElements.forEach((el) => observer.observe(el));

const cards = document.querySelectorAll(".project-card");
/* Windows */
cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--y", `${e.clientY - rect.top}px`);
  });
});
/* HP */
cards.forEach((card) => {
  card.addEventListener("touchstart", (e) => {
    const rect = card.getBoundingClientRect();
    const touch = e.touches[0];
    card.style.setProperty("--x", `${touch.clientX - rect.left}px`);
    card.style.setProperty("--y", `${touch.clientY - rect.top}px`);
    card.classList.add("mobile-glow");
  });
});
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--y", `${e.clientY - rect.top}px`);
  });
});

// Smooth scroll untuk navigasi project (jika banyak project)
document.addEventListener('DOMContentLoaded', function() {
  const projectGrid = document.querySelector('.projects-grid');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  // Jika ingin implementasi carousel/slider
  let currentIndex = 0;
  const projects = document.querySelectorAll('.project-card');
  const totalProjects = projects.length;
  
  // Function untuk update tampilan berdasarkan index
  function updateProjectsDisplay() {
    projects.forEach((project, index) => {
      if (index >= currentIndex && index < currentIndex + 3) {
        project.style.display = 'block';
      } else {
        project.style.display = 'none';
      }
    });
    
    // Update button states
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= totalProjects - 3;
  }
  
  // Event listeners untuk navigation
  if (prevBtn && nextBtn && totalProjects > 3) {
    prevBtn.addEventListener('click', function() {
      if (currentIndex > 0) {
        currentIndex--;
        updateProjectsDisplay();
      }
    });
    
    nextBtn.addEventListener('click', function() {
      if (currentIndex < totalProjects - 3) {
        currentIndex++;
        updateProjectsDisplay();
      }
    });
    
    // Initialize display
    updateProjectsDisplay();
  }
  
  // Hover effect enhancement
  projects.forEach(project => {
    project.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
    });
    
    project.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Filter projects by technology (optional enhancement)
  const filterButtons = document.querySelectorAll('.filter-btn'); // Tambahkan jika mau filter
  
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        const filterValue = this.getAttribute('data-filter');
        
        projects.forEach(project => {
          const techTags = Array.from(project.querySelectorAll('.tech-tag'))
            .map(tag => tag.textContent.toLowerCase());
          
          if (filterValue === 'all' || techTags.includes(filterValue)) {
            project.style.display = 'block';
          } else {
            project.style.display = 'none';
          }
        });
      });
    });
  }
});
// Enhanced smooth scroll dengan spacing
document.addEventListener('DOMContentLoaded', function() {
  const navbarLinks = document.querySelectorAll('.navbar a[href^="#"]');
  const navbar = document.querySelector('.navbar');
  const navbarHeight = navbar.offsetHeight;
  
  // Smooth scroll dengan offset besar
  navbarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      // Calculate position dengan offset besar
      const extraSpacing = 100; // Extra spacing untuk visibilitas
      const targetPosition = targetElement.offsetTop - navbarHeight - extraSpacing;
      
      // Smooth scroll ke posisi
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Update URL
      history.pushState(null, null, targetId);
      
      // Highlight section (opsional)
      targetElement.classList.add('highlight');
      setTimeout(() => {
        targetElement.classList.remove('highlight');
      }, 1500);
    });
  });
  
  // Update active nav link saat scroll
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + navbarHeight + 200; // Offset besar
    
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = sectionId;
      }
    });
    
    // Update nav links
    navbarLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
    
    // Jika di atas semua section (hero), remove semua active
    if (window.scrollY < 100) {
      navbarLinks.forEach(link => link.classList.remove('active'));
    }
  }
  
  // Initialize
  updateActiveNavLink();
  
  // Update on scroll dengan debounce untuk performa
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(updateActiveNavLink, 100);
  });
});