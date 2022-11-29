/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif']
      },
      keyframes:{
        notification:{
          '0%': {
            'left':'100%',
            'opacity':'1'
          },
          '8%':{
            'left':'0%',
            'opacity':'1'
          },
          '88%':{
            'left':'0%',
            'opacity':'1'
          },
          '100%':{
            'left':'0%',
            'opacity':'0'
          }

        }
      },
      animation:{
        notification: 'notification 5s forwards'
      }
    },
  },
  plugins: [],
}
