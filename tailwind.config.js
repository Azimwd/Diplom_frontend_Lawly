// tailwind.config.js
module.exports = {
	darkMode: 'class',
	theme: {
		boxShadow: {
			"custom-right": "8px 0 16px 0 rgba(26,35,126,0.2)",
			"custom-top": "0 -8px 16px 0 rgba(26,35,126,0.2)",
		},
		extend: {
			keyframes: {
				slideUp: {
					"0%": { opacity: 0, transform: "translateY(40px)" },
					"100%": { opacity: 1, transform: "translateY(0)" },
				},
			},
			animation: {
				slideUp: "slideUp 0.6s ease-out",
			},
		},
	},
};
