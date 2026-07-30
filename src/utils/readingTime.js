const WORDS_PER_MINUTE = 200;

const getReadingTime = html => {
  const text = html.replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);
  return `${minutes} min read`;
};

export default getReadingTime;
