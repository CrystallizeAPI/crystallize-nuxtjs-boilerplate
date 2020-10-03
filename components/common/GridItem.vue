<template>
  <a class="outer">
    <div class="text">
      <span class="price">$299.00</span>
      <h3>Example</h3>
      <Button />
    </div>
    <div class="image-wraper">
      <div class="img">
        <img 
          src="https://media.crystallize.com/furniture/20/4/24/4/@1366/loung-chair.webp" 
          alt="something"
        >
      </div>
    </div>
  </a>
</template>

<style scoped>
.image-wraper {
  position: relative;
  z-index: 1;
  overflow: hidden;
  height: 100%;
  width: 100%;
}

.img {
  width: 100%;
  height: 100%;
  display: block;
  margin: 0 auto;
}

.img img {
  display: block;
  object-fit: contain;
  object-position: center;
  width: 100%;
  height: 100%;
}

.title {
  font-size: 2.5rem;
  text-transform: uppercase;
  color: var(--color-text-main);
  font-weight: 900;
  font-family: 'Roboto', sans-serif;
}

.text {
  z-index: 2;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1em;
}

.price {
  color: inherit;
  font-size: 1.5rem;
  color: var(--color-price);
  font-weight: bold;
}

.outer {
  position: relative;
  background: var(--color-box-background);
  height: 100%;
  display: flex;
  padding: 0 50px;
}

.outer:hover {
  text-decoration: none;
}

.outer button {
  margin: 0 auto;
  min-width: 200px;
  max-width: 80%;
}

@media (max-width: 768px) {
  .outer {
    flex-direction: column-reverse;
    text-align: center;
    margin-bottom: 15px;
    padding: 50px;
  }
}

@media (min-width: 1024px) {
  .outer.cell-1x1 {
    flex-direction: column-reverse;
    justify-content: center;
    padding-bottom: 50px;
    text-align: center;
  }

  .outer.cell-1x2 {
    flex-direction: row-reverse;
    padding: 0 50px 0 0;
  }

  .outer.cell-1x2 .image {
    width: 200%;
    transform: translateX(-50%);
  }

  .outer.cell-1x2 button {
    margin: 0 0;
  }

  .outer.cell-1x3 {
    padding-left: 15rem;
  }

  .outer.cell-1x3 button {
    margin: 0 0;
  }

  .outer.cell-2x2 {
    flex-direction: column-reverse;
    padding-bottom: 50px;
    text-align: center;
  }
}
</style>