<script setup>
import phoneIcon from "../../assets/icons/categories/category-phone.svg";
import watchIcon from "../../assets/icons/categories/category-watch.svg";
import cameraIcon from "../../assets/icons/categories/category-camera.svg";
import headphonesIcon from "../../assets/icons/categories/category-headphones.svg";
import computerIcon from "../../assets/icons/categories/category-computer.svg";
import gamingIcon from "../../assets/icons/categories/category-gaming.svg";

const categories = [
  {
    title: "Phones",
    icon: phoneIcon,
  },
  {
    title: "Smart Watches",
    icon: watchIcon,
  },
  {
    title: "Cameras",
    icon: cameraIcon,
  },
  {
    title: "Headphones",
    icon: headphonesIcon,
  },
  {
    title: "Computers",
    icon: computerIcon,
  },
  {
    title: "Gaming",
    icon: gamingIcon,
  },
];
</script>

<template>
  <section class="categories">
    <div class="categories__inner">
      <div class="categories__top">
        <h2 class="categories__title">Browse By Category</h2>

        <div class="categories__arrows">
          <button
            class="categories__arrow"
            type="button"
            aria-label="Previous category"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 8L12 16L20 24"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <button
            class="categories__arrow"
            type="button"
            aria-label="Next category"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 8L20 16L12 24"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div class="categories__list">
        <button
          v-for="category in categories"
          :key="category.title"
          class="category-card"
          type="button"
        >
          <img
            class="category-card__icon"
            :src="category.icon"
            :alt="category.title"
          />

          <span class="category-card__title">
            {{ category.title }}
          </span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.categories {
  width: 100%;
  padding: 80px 0;

  background-color: #fafafa;
}

.categories__inner {
  width: 100%;
  max-width: 1128px;
  margin: 0 auto;
}

.categories__top {
  margin-bottom: 32px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.categories__title {
  margin: 0;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 24px;
  font-style: italic;
  font-weight: 400;
  line-height: 32px;
  color: #000000;
}

.categories__arrows {
  display: flex;
  align-items: center;
  gap: 16px;
}

.categories__arrow {
  width: 32px;
  height: 32px;
  padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  background-color: transparent;
  cursor: pointer;
}

.categories__list {
  display: grid;
  grid-template-columns: repeat(6, 160px);
  gap: 32px;
}

.category-card {
  width: 160px;
  height: 128px;
  padding: 24px 12px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  border: none;
  border-radius: 15px;
  background-color: #ededed;

  cursor: pointer;
}

.category-card:hover {
  background-color: #e3e3e3;
}

.category-card__icon {
  width: 48px;
  height: 48px;

  object-fit: contain;
}

.category-card__title {
  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-style: italic;
  font-weight: 400;
  line-height: 24px;
  color: #000000;
  text-align: center;
}
</style>
