// tailwind.config.js
module.exports = {
  content: ["./*.html", "./src/**/*.js"],
  safelist: [
    // Class yang ditambahkan JavaScript secara dinamis — wajib di-safelist
    // supaya tidak di-purge saat build CLI
    'bg-green-500',   // form submit feedback
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Cormorant Garamond', 'serif'],
      },
      colors: {
        teal: { 400:'#2dd4bf', 500:'#14b8a6', 600:'#0d9488' }
      },
      keyframes: {
        glowPulse:    { '0%,100%':{ transform:'scale(1)', opacity:'0.8' }, '50%':{ transform:'scale(1.15)', opacity:'1' } },
        lineExpand:   { from:{ width:'0', opacity:'0' }, to:{ width:'min(500px,80vw)', opacity:'1' } },
        cornerFade:   { to:{ opacity:'1' } },
        charReveal:   { to:{ opacity:'1', transform:'translateY(0) rotate(0deg)' } },
        fadeUpAnim:   { to:{ opacity:'1', transform:'translateY(0)' } },
        progressFill: { '0%':{ width:'0%' }, '60%':{ width:'75%' }, '100%':{ width:'100%' } },
      },
      animation: {
        'glow-pulse':    'glowPulse 3s ease-in-out infinite',
        'line-expand':   'lineExpand 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s forwards',
        'corner-fade':   'cornerFade 0.6s ease 0.6s forwards',
        'char-reveal':   'charReveal 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-up-label': 'fadeUpAnim 0.7s ease 0.8s forwards',
        'fade-up-sub':   'fadeUpAnim 0.7s ease 1.5s forwards',
        'fade-up-track': 'fadeUpAnim 0.5s ease 1.2s forwards',
        'progress-fill': 'progressFill 1.5s cubic-bezier(0.4,0,0.2,1) 1.3s forwards',
      }
    }
  }
}
