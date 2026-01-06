document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const audioPlayer = document.getElementById('audioPlayer');
    const playBtn = document.getElementById('playBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.getElementById('progressBar');
    const progress = document.getElementById('progress');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    const volumeSlider = document.getElementById('volumeSlider');
    const playlist = document.getElementById('playlist');
    const songTitle = document.getElementById('songTitle');
    const artistName = document.getElementById('artistName');
    const fileInput = document.getElementById('fileInput');
    const uploadBtn = document.getElementById('uploadBtn');
    const albumCover = document.getElementById('albumCover');
    
    // 搜索相关元素
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const onlineSearchInput = document.getElementById('onlineSearchInput');
    const searchSource = document.getElementById('searchSource');
    const onlineSearchBtn = document.getElementById('onlineSearchBtn');
    const searchResults = document.getElementById('searchResults');
    
    // 播放列表
    let songs = Array.from(playlist.querySelectorAll('li'));
    let currentSongIndex = 0;
    let isPlaying = false;
    
    // 初始化
    function init() {
        loadSong(currentSongIndex);
        updatePlaylistUI();
    }
    
    // 加载歌曲
    function loadSong(index) {
        const song = songs[index];
        const songSrc = song.getAttribute('data-src');
        
        audioPlayer.src = songSrc;
        songTitle.textContent = song.textContent;
        artistName.textContent = song.getAttribute('data-artist') || '本地艺术家';
        
        // 更新随机专辑封面
        const randomSeed = Math.random().toString(36).substring(7);
        albumCover.src = `https://picsum.photos/seed/${randomSeed}/300/300.jpg`;
    }
    
    // 播放/暂停
    function togglePlay() {
        if (isPlaying) {
            audioPlayer.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            audioPlayer.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    }
    
    // 上一首
    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(currentSongIndex);
        updatePlaylistUI();
        if (isPlaying) {
            audioPlayer.play();
        }
    }
    
    // 下一首
    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
        updatePlaylistUI();
        if (isPlaying) {
            audioPlayer.play();
        }
    }
    
    // 更新播放列表UI
    function updatePlaylistUI() {
        songs.forEach((song, index) => {
            if (index === currentSongIndex) {
                song.classList.add('active');
            } else {
                song.classList.remove('active');
            }
        });
    }
    
    // 格式化时间
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }
    
    // 更新进度条
    function updateProgress() {
        const { currentTime, duration } = audioPlayer;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        currentTimeEl.textContent = formatTime(currentTime);
        durationEl.textContent = formatTime(duration);
    }
    
    // 设置进度
    function setProgress(e) {
        const width = progressBar.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;
        audioPlayer.currentTime = (clickX / width) * duration;
    }
    
    // 设置音量
    function setVolume() {
        audioPlayer.volume = volumeSlider.value / 100;
    }
    
    // 处理播放列表点击
    function handlePlaylistClick(e) {
        if (e.target.tagName === 'LI') {
            const index = Array.from(playlist.children).indexOf(e.target);
            currentSongIndex = index;
            loadSong(currentSongIndex);
            updatePlaylistUI();
            if (!isPlaying) {
                togglePlay();
            } else {
                audioPlayer.play();
            }
        }
    }
    
    // 处理文件上传
    function handleFileUpload() {
        const files = fileInput.files;
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileURL = URL.createObjectURL(file);
            
            const li = document.createElement('li');
            li.textContent = file.name.replace(/\.[^/.]+$/, '');
            li.setAttribute('data-src', fileURL);
            
            playlist.appendChild(li);
        }
        
        // 更新歌曲列表
        songs = Array.from(playlist.querySelectorAll('li'));
    }
    
    // 本地搜索功能
    function handleLocalSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        
        songs.forEach(song => {
            const songTitle = song.textContent.toLowerCase();
            if (songTitle.includes(searchTerm)) {
                song.classList.remove('hidden');
            } else {
                song.classList.add('hidden');
            }
        });
    }
    
    // 在线搜索功能
    function handleOnlineSearch() {
        const searchTerm = onlineSearchInput.value.trim();
        const source = searchSource.value;
        
        if (!searchTerm) {
            showMessage('请输入搜索关键词', 'error');
            return;
        }
        
        // 显示加载状态
        searchResults.innerHTML = '<div class="loading">正在搜索...</div>';
        
        // 根据不同的搜索源执行搜索
        switch (source) {
            case 'jamendo':
                searchJamendo(searchTerm);
                break;
            case 'soundcloud':
                searchSoundCloud(searchTerm);
                break;
            case 'youtube':
                searchYouTube(searchTerm);
                break;
            default:
                showMessage('不支持的搜索源', 'error');
        }
    }
    
    // Jamendo API搜索
    function searchJamendo(query) {
        // 使用Jamendo API搜索音乐
        const url = `https://api.jamendo.com/v3.0/tracks/?client_id=your_client_id&format=json&limit=10&search=${encodeURIComponent(query)}`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                displaySearchResults(data.results, 'jamendo');
            })
            .catch(error => {
                console.error('Jamendo搜索错误:', error);
                // 使用模拟数据作为备选
                displayMockResults(query, 'jamendo');
            });
    }
    
    // SoundCloud搜索（模拟）
    function searchSoundCloud(query) {
        // 由于SoundCloud API需要认证，这里使用模拟数据
        displayMockResults(query, 'soundcloud');
    }
    
    // YouTube搜索（模拟）
    function searchYouTube(query) {
        // 由于YouTube API需要认证，这里使用模拟数据
        displayMockResults(query, 'youtube');
    }
    
    // 显示模拟搜索结果
    function displayMockResults(query, source) {
        const mockResults = [
            {
                title: `${query} - 示例歌曲 1`,
                artist: '示例艺术家',
                duration: '3:45',
                url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
                cover: `https://picsum.photos/seed/${query}1/60/60.jpg`
            },
            {
                title: `${query} - 示例歌曲 2`,
                artist: '另一个艺术家',
                duration: '4:12',
                url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
                cover: `https://picsum.photos/seed/${query}2/60/60.jpg`
            },
            {
                title: `${query} - 示例歌曲 3`,
                artist: '第三个艺术家',
                duration: '2:58',
                url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
                cover: `https://picsum.photos/seed/${query}3/60/60.jpg`
            }
        ];
        
        displaySearchResults(mockResults, source);
    }
    
    // 显示搜索结果
    function displaySearchResults(results, source) {
        searchResults.innerHTML = '';
        
        if (!results || results.length === 0) {
            searchResults.innerHTML = '<div class="error-message">未找到相关结果</div>';
            return;
        }
        
        results.forEach((result, index) => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            
            // 根据不同来源处理结果数据
            let title, artist, duration, url, cover;
            
            if (source === 'jamendo') {
                title = result.name || result.title;
                artist = result.artist_name || result.artist || '未知艺术家';
                duration = formatDuration(result.duration);
                url = result.audio || result.url;
                cover = result.album_image || `https://picsum.photos/seed/jamendo${index}/60/60.jpg`;
            } else {
                // 对于模拟数据或其他来源
                title = result.title;
                artist = result.artist;
                duration = result.duration;
                url = result.url;
                cover = result.cover || `https://picsum.photos/seed/${source}${index}/60/60.jpg`;
            }
            
            resultItem.innerHTML = `
                <div class="search-result-info">
                    <div class="search-result-title">${title}</div>
                    <div class="search-result-artist">${artist}</div>
                </div>
                <div class="search-result-duration">${duration}</div>
                <button class="add-to-playlist-btn" data-src="${url}" data-title="${title}" data-artist="${artist}">添加</button>
            `;
            
            searchResults.appendChild(resultItem);
        });
        
        // 为添加按钮添加事件监听
        const addButtons = searchResults.querySelectorAll('.add-to-playlist-btn');
        addButtons.forEach(button => {
            button.addEventListener('click', function() {
                const src = this.getAttribute('data-src');
                const title = this.getAttribute('data-title');
                const artist = this.getAttribute('data-artist');
                
                addSongToPlaylist(src, title, artist);
                this.textContent = '已添加';
                this.disabled = true;
            });
        });
    }
    
    // 格式化时长（秒转为分:秒）
    function formatDuration(seconds) {
        if (!seconds) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }
    
    // 添加歌曲到播放列表
    function addSongToPlaylist(src, title, artist) {
        const li = document.createElement('li');
        li.textContent = title;
        li.setAttribute('data-src', src);
        li.setAttribute('data-artist', artist);
        
        playlist.appendChild(li);
        
        // 更新歌曲列表
        songs = Array.from(playlist.querySelectorAll('li'));
        
        showMessage(`已添加 "${title}" 到播放列表`, 'success');
    }
    
    // 显示消息
    function showMessage(message, type) {
        // 创建消息元素
        const messageEl = document.createElement('div');
        messageEl.className = `${type}-message`;
        messageEl.textContent = message;
        
        // 添加到搜索结果区域
        searchResults.innerHTML = '';
        searchResults.appendChild(messageEl);
        
        // 3秒后自动移除
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 3000);
    }
    
    // 事件监听器
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('ended', nextSong);
    progressBar.addEventListener('click', setProgress);
    volumeSlider.addEventListener('input', setVolume);
    playlist.addEventListener('click', handlePlaylistClick);
    uploadBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileUpload);
    
    // 搜索功能事件监听
    searchInput.addEventListener('input', handleLocalSearch);
    searchBtn.addEventListener('click', handleLocalSearch);
    onlineSearchBtn.addEventListener('click', handleOnlineSearch);
    onlineSearchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleOnlineSearch();
        }
    });
    
    // 初始化播放器
    init();
});