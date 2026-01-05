import { onBeforeUnmount, reactive, onMounted } from "vue";

export const useMousePosition = () => {
  const pos = reactive({
    x: 0,
    y: 0,
  });

  const mousemove = (e) => {
    console.log(e.pageX, e.pageY);
    (pos.x = e.pageX), (pos.y = e.pageY);
  };

  onMounted(() => {
    document.addEventListener("mousemove", mousemove);
  });

  onBeforeUnmount(() => {
    document.removeEventListener("mousemove", mousemove);
  });

  return pos;
};
