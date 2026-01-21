
(function() {
  var colors = ["#D61C59", "#E7D84B", "#1B8798"];
  var characters = ["✨", "★", "⚡"];
  var elementGroup = [];
  
  // Definition
  function Element(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.floor(Math.random() * 5 + 10);
    this.text = characters[Math.floor(Math.random() * characters.length)];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    
    this.element = document.createElement("div");
    this.element.style.position = "fixed";
    this.element.style.top = this.y + "px";
    this.element.style.left = this.x + "px";
    this.element.style.fontSize = this.size + "px";
    this.element.style.color = this.color;
    this.element.style.pointerEvents = "none";
    this.element.style.zIndex = "999999";
    this.element.innerHTML = this.text;
    document.body.appendChild(this.element);
    
    this.velocity = {
      x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
      y: 1
    };
    this.life = Math.random() * 20 + 30; // lifespan
  }
  
  Element.prototype.update = function() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.life--;
    
    this.element.style.top = this.y + "px";
    this.element.style.left = this.x + "px";
    this.element.style.opacity = this.life / 50;
    
    if (this.life <= 0) {
      this.element.parentNode.removeChild(this.element);
      return false; // dead
    }
    return true; // alive
  };
  
  function addElement(x, y) {
    elementGroup.push(new Element(x, y));
  }
  
  function animate() {
    for (var i = 0; i < elementGroup.length; i++) {
      if (!elementGroup[i].update()) {
        elementGroup.splice(i, 1);
        i--;
      }
    }
    requestAnimationFrame(animate);
  }
  
  // Event Listeners
  document.addEventListener("mousemove", function(e) {
    // Add element occasionally to avoid too many
    if(Math.random() < 0.3) {
        addElement(e.clientX, e.clientY);
    }
  });
  
  animate();
})();
