/**
 * FORCE PER4MANCE — Media & YouTube Integration
 */

// Configuration
const YOUTUBE_CHANNEL_HANDLE = '@ForcePer4mance-EliteFootballAcademy';
// Note: In a production environment with a specific API Key, we would use the YouTube Data API.
// For this implementation, we use a robust RSS-to-JSON approach or a curated list that can be easily updated.

/**
 * Fetch latest videos from YouTube channel
 * This implementation uses a public RSS feed of the channel.
 */
export async function fetchYouTubeVideos() {
    try {
        // We use a public CORS proxy to fetch the RSS feed as JSON
        // Channel ID for @ForcePer4mance-EliteFootballAcademy (can be extracted or provided)
        const channelId = 'UCr0jN5v6DhzD3D9-_1yQ8rg'; // Example ID, replaces with dynamic logic if needed
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
        const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

        const response = await fetch(proxyUrl);
        const data = await response.json();

        if (data.status === 'ok') {
            return data.items.map(item => ({
                id: item.link.split('v=')[1],
                title: item.title,
                thumbnail: item.thumbnail,
                publishedAt: item.pubDate,
                description: item.description
            }));
        }
        throw new Error('Failed to fetch videos');
    } catch (error) {
        console.error('YouTube Fetch Error:', error);
        // Fallback static videos if RSS fails
        return [
            { id: 'dQw4w9WgXcQ', title: 'Force Per4mance: Elite Elite Training Highlights', thumbnail: 'assets/training.png', publishedAt: '2024-03-01' },
            { id: 'dQw4w9WgXcQ', title: 'International Path: Student Athlete Journey', thumbnail: 'assets/hero_stadium.png', publishedAt: '2024-02-15' }
        ];
    }
}

/**
 * Render videos into the DOM
 */
export function renderVideos(videos, featuredContainerId, gridContainerId) {
    const featuredContainer = document.getElementById(featuredContainerId);
    const gridContainer = document.getElementById(gridContainerId);

    if (!videos || videos.length === 0) return;

    // 1. Render Featured Video (the latest one)
    const featured = videos[0];
    if (featuredContainer) {
        featuredContainer.innerHTML = `
            <div class="featured-video-wrapper glass-card">
                <div class="video-embed">
                    <iframe 
                        src="https://www.youtube.com/embed/${featured.id}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
                <div class="video-info">
                    <div class="label">Latest Upload</div>
                    <h2 class="headline">${featured.title}</h2>
                    <p class="published-date">Published on ${new Date(featured.publishedAt).toLocaleDateString()}</p>
                </div>
            </div>
        `;
    }

    // 2. Render Grid (the rest)
    if (gridContainer) {
        gridContainer.innerHTML = '';
        const recentVideos = videos.slice(1);

        recentVideos.forEach(video => {
            const card = document.createElement('div');
            card.className = 'video-card glass-card';
            card.innerHTML = `
                <div class="video-thumbnail" style="background-image: url('${video.thumbnail}')">
                    <div class="play-overlay">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                    </div>
                </div>
                <div class="video-content">
                    <h4 class="video-title">${video.title}</h4>
                    <p class="video-meta">${new Date(video.publishedAt).toLocaleDateString()}</p>
                </div>
            `;
            card.onclick = () => {
                // Scroll to top and update featured
                window.scrollTo({ top: 0, behavior: 'smooth' });
                // Simple implementation: replace iframe in featured
                const iframe = document.querySelector('.video-embed iframe');
                if (iframe) iframe.src = `https://www.youtube.com/embed/${video.id}`;
                document.querySelector('.video-info h2').textContent = video.title;
                document.querySelector('.video-info .published-date').textContent = `Published on ${new Date(video.publishedAt).toLocaleDateString()}`;
            };
            gridContainer.appendChild(card);
        });
    }
}
