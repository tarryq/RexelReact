export const debounce = (func, delay) => {
  let timer;
  return (...args) => {
   if (timer) clearTimeout(timer);
   timer = setTimeout(() => {
    func(...args);
   }, delay);
  };
 };


 export const highlightText = (text, highlight) => {
  if (!text || !highlight) {
   return text;
  }

  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return parts.map((part, index) => {
   const isHighlighted = part.toLowerCase() === highlight.toLowerCase();
   return (
    <span style={isHighlighted ? { backgroundColor: '#4B449D', fontWeight: '700', color: '#ffffff' } : {}}>
     {part}
    </span>
   );
  });
 };