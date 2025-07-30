/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      },
      colors: {
        // TV Compose Design System - Complete Color Palette
        'tv-compose': {
          // Basic colors
          'black': '#000000',
          'white': '#FFFFFF',
          
          // Primary palette
          'primary': {
            0: '#000000',
            10: '#041E49',
            20: '#062E6F', 
            30: '#0842A0',
            40: '#0B57D0',
            50: '#1B6EF3',
            60: '#4C8DF6',
            70: '#7CACF8',
            80: '#A8C7FA',
            90: '#D3E3FD',
            95: '#ECF3FE',
            99: '#FAFBFF',
            100: '#FFFFFF',
          },
          
          // Secondary palette
          'secondary': {
            0: '#000000',
            10: '#001D35',
            20: '#003355',
            30: '#004A77',
            40: '#00639B',
            50: '#047DB7',
            60: '#3998D3',
            70: '#5AB3F0',
            80: '#7FCFFF',
            90: '#C2E7FF',
            95: '#DFF3FF',
            99: '#FAFBFF',
            100: '#FFFFFF',
          },
          
          // Tertiary palette (greens)
          'tertiary': {
            0: '#000000',
            10: '#072711',
            20: '#0A3818',
            30: '#0F5223',
            40: '#146C2E',
            50: '#198639',
            60: '#1EA446',
            70: '#37BE5F',
            80: '#6DD58C',
            90: '#C4EED0',
            95: '#E7F8ED',
            99: '#F2FFEE',
            100: '#FFFFFF',
          },
          
          // Error palette (reds)
          'error': {
            0: '#000000',
            10: '#410E0B',
            20: '#601410',
            30: '#8C1D18',
            40: '#B3261E',
            50: '#DC362E',
            60: '#E46962',
            70: '#EC928E',
            80: '#F2B8B5',
            90: '#F9DEDC',
            95: '#FCEEEE',
            99: '#FFFBF9',
            100: '#FFFFFF',
          },
          
          // Neutral palette
          'neutral': {
            0: '#000000',
            10: '#1F1F1F',
            20: '#474747',
            30: '#5E5E5E',
            40: '#757575',
            50: '#8F8F8F',
            60: '#ABABAB',
            70: '#C7C7C7',
            80: '#E3E3E3',
            90: '#F2F2F2',
            95: '#FAFBFF',
            100: '#FFFFFF',
          },
          
          // Neutral variant palette
          'neutral-variant': {
            0: '#000000',
            10: '#191D1C',
            20: '#2D312F',
            30: '#444746',
            40: '#5C5F5E',
            50: '#747775',
            60: '#8E918F',
            70: '#A9ACAA',
            80: '#C4C7C5',
            90: '#E1E3E1',
            95: '#EFF2EF',
            99: '#FAFBFF',
            100: '#FFFFFF',
          },
          
          // System colors (semantic)
          'surface': '#131314',
          'surface-variant': '#444746',
          'surface-container': '#1E1F20',
          'on-surface': '#E3E3E3',
          'on-surface-variant': '#E3E3E3',
          'inverse-surface': '#E3E3E3',
          'inverse-on-surface': '#303030',
          'primary-container': '#0842A0',
          'on-primary-container': '#D3E3FD',
        },
        
        // TV-specific color palette (keeping existing for compatibility)
        'tv-bg': {
          primary: '#0F0F0F',
          secondary: '#1A1A1A',
          tertiary: '#2A2A2A',
        },
        'tv-text': {
          primary: '#FFFFFF',
          secondary: '#B3B3B3',
          muted: '#666666',
        },
        'tv-accent': {
          primary: '#007AFF',
          secondary: '#5AC8FA',
          success: '#30D158',
          warning: '#FF9F0A',
          error: '#FF453A',
        },
      },
      
      spacing: {
        // TV-optimized spacing
        'tv-xs': '8px',
        'tv-sm': '16px',
        'tv-md': '24px',
        'tv-lg': '32px',
        'tv-xl': '48px',
        'tv-2xl': '64px',
        'tv-3xl': '96px',
      },
      
      fontSize: {
        // TV Compose Typography System (complete from Figma)
        
        // Display
        'tv-display-large': ['57px', { 
          lineHeight: '64px', 
          letterSpacing: '-0.25px',
          fontWeight: '400' 
        }],
        'tv-display-medium': ['45px', { 
          lineHeight: '52px', 
          letterSpacing: '0px',
          fontWeight: '400' 
        }],
        'tv-display-small': ['36px', { 
          lineHeight: '44px', 
          letterSpacing: '0px',
          fontWeight: '400' 
        }],
        
        // Headline
        'tv-headline-large': ['32px', { 
          lineHeight: '40px', 
          letterSpacing: '0px',
          fontWeight: '400' 
        }],
        'tv-headline-medium': ['28px', { 
          lineHeight: '36px', 
          letterSpacing: '0px',
          fontWeight: '400' 
        }],
        'tv-headline-small': ['24px', { 
          lineHeight: '32px', 
          letterSpacing: '0px',
          fontWeight: '400' 
        }],
        
        // Title
        'tv-title-large': ['22px', { 
          lineHeight: '28px', 
          letterSpacing: '0px',
          fontWeight: '400' 
        }],
        'tv-title-medium': ['16px', { 
          lineHeight: '24px', 
          letterSpacing: '0.15px',
          fontWeight: '500' 
        }],
        'tv-title-small': ['14px', { 
          lineHeight: '20px', 
          letterSpacing: '0.1px',
          fontWeight: '500' 
        }],
        
        // Label
        'tv-label-large': ['14px', { 
          lineHeight: '20px', 
          letterSpacing: '0.1px',
          fontWeight: '500' 
        }],
        'tv-label-medium': ['12px', { 
          lineHeight: '16px', 
          letterSpacing: '0.25px',
          fontWeight: '500' 
        }],
        'tv-label-small': ['11px', { 
          lineHeight: '16px', 
          letterSpacing: '0.1px',
          fontWeight: '500' 
        }],
        
        // Body
        'tv-body-large': ['16px', { 
          lineHeight: '24px', 
          letterSpacing: '0.25px',
          fontWeight: '400' 
        }],
        'tv-body-medium': ['14px', { 
          lineHeight: '20px', 
          letterSpacing: '0.25px',
          fontWeight: '400' 
        }],
        'tv-body-small': ['12px', { 
          lineHeight: '16px', 
          letterSpacing: '0.2px',
          fontWeight: '400' 
        }],
        
        // TV-optimized typography (keeping existing for compatibility)
        'tv-xs': ['14px', { lineHeight: '1.5' }],
        'tv-sm': ['16px', { lineHeight: '1.5' }],
        'tv-base': ['18px', { lineHeight: '1.5' }],
        'tv-lg': ['24px', { lineHeight: '1.4' }],
        'tv-xl': ['32px', { lineHeight: '1.3' }],
        'tv-2xl': ['42px', { lineHeight: '1.2' }],
        'tv-3xl': ['56px', { lineHeight: '1.1' }],
        'tv-4xl': ['72px', { lineHeight: '1.1' }],
      },
      
      borderRadius: {
        'tv-sm': '8px',
        'tv-md': '12px',
        'tv-md-focus': '13.2px', // Figma focus state
        'tv-lg': '16px',
        'tv-xl': '24px',
      },
      
      boxShadow: {
        'tv-focus': '0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
        'tv-focus-drop': '0px 1px 2px rgba(0, 0, 0, 0.3)',
        'tv-modal': '0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3)', // TV Compose/dark/3
        'tv-snackbar': '0px 6px 10px 4px rgba(0, 0, 0, 0.15), 0px 2px 3px rgba(0, 0, 0, 0.3)', // TV Compose/dark/4
      },
      
      scale: {
        '110': '1.1', // Figma focus scale
      },
      
      animation: {
        'fade-in': 'fadeIn 0.15s ease-out',
        'fade-out': 'fadeOut 0.15s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'scale-out': 'scaleOut 0.2s ease-out',
        'tv-focus': 'tvFocus 0.2s ease-out',
        'tv-progress-spin': 'tvProgressSpin 2s linear infinite',
        'tv-progress-indeterminate': 'tvProgressIndeterminate 2s ease-in-out infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scaleOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.95)' },
        },
        tvFocus: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
        tvProgressSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        tvProgressIndeterminate: {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
} 