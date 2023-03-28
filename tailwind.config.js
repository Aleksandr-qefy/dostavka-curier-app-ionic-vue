const colors = require('tailwindcss/colors')
//import efs from 'src/assets/svg/topography.svg'
//console.log(efs)
module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            animation: {
                'spin-slow': 'spin 3s linear infinite',
            },
            colors: {
                primary: '#43b581',//#00a550 #00a79d #1db954 #00b26a
                secondary: colors.blueGray, //#3b3961
                //neutral: colors.blueGray, //#85d7ff

                gray: colors.coolGray,
                //yellow: '#ced23a', //#b3b300

            },
            /*backgroundImage: theme => ({
            'hero-pattern': "url('/src/assets/svg/topography.svg')",
            })*/
        }
    },
    variants: {
      extend: {
          borderStyle: 'focus',
          scale: 'focus',
          opacity: ['disabled'],
          transform: ['hover', 'focus'],
      },
    },
    plugins: [],
    experimental: {
        applyComplexClasses: true,
    }
}
