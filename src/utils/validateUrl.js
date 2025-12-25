export const isValidYouTubeUrl = (url) => {
  if (!url) return false;

  try {
    const parsedUrl = new URL(url);

    // Allow youtube.com and youtu.be
    if (
      parsedUrl.hostname !== "www.youtube.com" &&
      parsedUrl.hostname !== "youtube.com" &&
      parsedUrl.hostname !== "youtu.be"
    ) {
      return false;
    }

    // Handle Shorts
    if (parsedUrl.pathname.startsWith("/shorts/")) {
      return true;
    }

    // Handle normal videos
    if (parsedUrl.searchParams.get("v")) {
      return true;
    }

    // Handle youtu.be links
    if (parsedUrl.hostname === "youtu.be" && parsedUrl.pathname.length > 1) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
};
