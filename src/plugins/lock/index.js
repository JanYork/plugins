// 锁屏
import { useLockOptions } from "@acnb/options";
import { loadScript } from "../../utils/helpers";
import { typedJs } from "../../constants/cdn";

const randomImage = "https://api.mz-moe.cn/img.php";

let typed;

/**
 * 创建元素
 */
function build() {
  $("body").append(`
    <div class='lock-screen'>
        <div class="lock-screen-weather"></div>
        <div class="lock-screen-user">
            <div class='lock-screen-text'>
                <span></span>
            </div>
        </div>
        <div class="lock-screen-close">🔑</div>
    </div>`);
}

/**
 * 设置锁屏背景
 * @param {*} background
 */
function setBackground(background) {
  const image = background === "" ? randomImage : background;
  $(".lock-screen").css("background-image", `url(${image})`);
}

/**
 * 打开锁屏
 * @param {*} strings
 */
function handleOpen(strings) {
  const typedOpts = {
    strings: strings.length ? strings : ["快去自定义你的个性签名吧~"],
    typeSpeed: 100,
  };
  $("#header").dblclick(function () {
    $("body").addClass("overflow");
    $(".lock-screen").css("top", "0");
    typed = new Typed(".lock-screen-text span", typedOpts);
  });
}

/**
 * 关闭锁屏
 */
function handleClose() {
  $(document).on("click", ".lock-screen-close", () => {
    $(".lock-screen").css("top", "-100vh");
    typed.destroy();
    setTimeout(() => {
      $("body").removeClass("overflow");
    }, 400);
  });
}

export const lock = (theme, devOptions) => {
  const { enable, background, strings } = useLockOptions(devOptions);
  if (!enable) return;
  build();
  setBackground(background);

  loadScript(typedJs, () => {
    handleOpen(strings);
    handleClose();
  });
};
