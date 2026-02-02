document.addEventListener('DOMContentLoaded', function() {
  // Only run on homepage
  if (location.pathname !== '/' && location.pathname !== '/index.html') return;

  var target = document.getElementById('recent-posts');
  if (!target) return;

  var container = document.createElement('div');
  container.id = 'planet-slider';
  container.className = 'planet-slider';
  
  // HTML Structure for Planets
  container.innerHTML = `
    <div class="planet-wrapper">
      <a href="/music/" class="planet-item" title="歌单">
        <div class="planet-box">
          <img src="/img/planets/music.png" class="planet-img" onerror="this.onerror=null;this.src='/img/loading.gif';">
        </div>
        <span>歌单</span>
      </a>
      <a href="/archives/" class="planet-item" title="归档">
        <div class="planet-box">
          <img src="/img/planets/archives.png" class="planet-img" onerror="this.onerror=null;this.src='/img/loading.gif';">
        </div>
        <span>归档</span>
      </a>
      <a href="/profile/" class="planet-item" title="简介">
        <div class="planet-box">
          <img src="/img/planets/profile.png" class="planet-img" onerror="this.onerror=null;this.src='/img/loading.gif';">
        </div>
        <span>简介</span>
      </a>
      <a href="/tags/" class="planet-item" title="标签">
        <div class="planet-box">
          <img src="/img/planets/tags.png" class="planet-img" onerror="this.onerror=null;this.src='/img/loading.gif';">
        </div>
        <span>标签</span>
      </a>
      <a href="/categories/" class="planet-item" title="分类">
        <div class="planet-box">
          <img src="/img/planets/categories.png" class="planet-img" onerror="this.onerror=null;this.src='/img/loading.gif';">
        </div>
        <span>分类</span>
      </a>
    </div>
  `;

  // Insert before the recent posts section
  var target = document.getElementById('recent-posts');
  if (target) {
    target.parentNode.insertBefore(container, target);
  } else {
    // Fallback: try to find the first child of the main layout content column
    // The main content column is usually .layout > div:first-child
    var layoutContent = document.querySelector('.layout > div:first-child');
    if (layoutContent) {
      layoutContent.insertBefore(container, layoutContent.firstChild);
    }
  }
});
