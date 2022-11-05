const estimatedReadingTime = (post) => {
  
    const totalWords = post.split(' ').length
    // Assumption: Average person reads 150 words per minute
    const totalWordsPerMinute = totalWords / 150
    return Math.round(totalWordsPerMinute) === 0 ? 1 : Math.round(totalWordsPerMinute)
  }
  
  module.exports = { estimatedReadingTime }