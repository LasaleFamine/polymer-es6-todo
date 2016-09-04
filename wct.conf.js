module.exports = {
  verbose: true,
  sauce: false,
  suites: ['test/unittest/index.html'],
  // testTimeout: 2000000000000000,
  plugins: {
  	sauce:{
  		disabled: true
  	},
    local: {
      remote: false,
      browsers: ['chrome']
    }
  }
};
