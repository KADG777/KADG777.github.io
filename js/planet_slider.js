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
        <div class="planet music-planet">
          <div class="planet-ring"></div>
        </div>
        <span>歌单</span>
      </a>
      <a href="/archives/" class="planet-item" title="归档">
        <div class="planet archive-planet">
          <div class="crater c1"></div>
          <div class="crater c2"></div>
        </div>
        <span>归档</span>
      </a>
      <a href="/profile/" class="planet-item" title="简介">
        <div class="planet profile-planet">
          <div class="land l1"></div>
          <div class="land l2"></div>
        </div>
        <span>简介</span>
      </a>
      <a href="/tags/" class="planet-item" title="标签">
        <div class="planet tag-planet">
           <div class="stripe s1"></div>
           <div class="stripe s2"></div>
        </div>
        <span>标签</span>
      </a>
      <a href="/categories/" class="planet-item" title="分类">
        <div class="planet category-planet">
          <div class="spot sp1"></div>
        </div>
        <span>分类</span>
      </a>
    </div>
  `;

  // Insert before the recent posts section
  target.parentNode.insertBefore(container, target);
});
