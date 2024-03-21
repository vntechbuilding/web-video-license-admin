import { NewsCategory } from '../../pages/news-category/news-category.service';

export const FlattenCategories = (
  categories: NewsCategory[],
  level = 0
): NewsCategory[] => {
  let flatCategories: NewsCategory[] = [];
  // console.log(level);

  for (let category of categories) {
    // Tạo một bản sao của danh mục và thêm vào khoảng trắng ở đầu tên dựa trên cấp độ của nó
    let newCategory = {
      ...category,
      title: '--'.repeat(level * 2) + category.title,
    };
    flatCategories.push(newCategory);

    // Nếu danh mục này có mục con, duyệt qua chúng
    if (category.children) {
      let childCategories = FlattenCategories(category.children, level + 1);
      flatCategories = flatCategories.concat(childCategories);
    }
  }
  // console.log(flatCategories);
  return flatCategories;
};
