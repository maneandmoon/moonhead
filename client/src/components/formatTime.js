const formatTime = (time) => {
    if (!time) return 'Unknown time';  
    const [hour, minute] = time.split(':');
    const formattedHour = hour % 12 || 12; // Convert to 12-hour format
    const ampm = hour >= 12 ? 'PM' : 'AM';
    return `${formattedHour}:${minute} ${ampm}`;
};

export default formatTime;
