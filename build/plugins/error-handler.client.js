export default defineNuxtPlugin(() => {
  if (process.client) {
    window.addEventListener('error', (event) => {
      if (event.message.includes('Blocked a frame with origin')) {
        // Prevent the error from being logged to the console
        event.preventDefault();
      }
    });
  }
});