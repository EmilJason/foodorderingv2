let state = {
  foods: [
    {
      name: "Adobo",
      description:
        "A popular Filipino dish made with chicken or pork marinated in vinegar, soy sauce, garlic, and spices.",
      imageUrl:
        "https://assets.unileversolutions.com/v1/39548395.jpg?im=AspectCrop=(1440,600);Resize=(1440,600)",
      price: 150.0,
    },
    {
      name: "Sinigang",
      description:
        "A sour soup made with tamarind, vegetables, and meat, often pork or shrimp.",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBc-BnU-ug4WDkdKILRM69F4bRPAEAuUgGng&s",
      price: 180.0,
    },
    {
      name: "Lechon",
      description:
        "A whole roasted pig, known for its crispy skin and tender meat.",
      imageUrl:
        "https://www.dukeshill.co.uk/cdn/shop/articles/20230502144252-cebu-style-lechon.jpg?v=1690310444",
      price: 2500.0,
    },
    {
      name: "Kare-Kare",
      description:
        "A Filipino stew made with oxtail, vegetables, and a thick peanut sauce.",
      imageUrl:
        "https://www.unileverfoodsolutions.com.ph/dam/global-ufs/mcos/SEA/calcmenu/recipes/PH-recipes/red-meats-&-red-meat-dishes/kare-kare/kare-kare-main.jpg",
      price: 200.0,
    },
    {
      name: "Pancit",
      description: "Stir-fried noodles with vegetables, meat, and seafood.",
      imageUrl:
        "https://khinskitchen.com/wp-content/uploads/2022/06/pancit-bihon-10-500x375.jpg",
      price: 120.0,
    },
    {
      name: "Halo-Halo",
      description:
        "A popular Filipino dessert with shaved ice, milk, sweet beans, fruits, and jellies.",
      imageUrl:
        "https://hips.hearstapps.com/hmg-prod/images/halo-halo1-1658258347.jpg?crop=0.671xw:1.00xh;0.167xw,0&resize=1200:*",
      price: 90.0,
    },
    {
      name: "Lumpia",
      description:
        "Filipino spring rolls filled with meat and vegetables, often served with a dipping sauce.",
      imageUrl:
        "https://www.allrecipes.com/thmb/91kDp_3WYGHzsmMkXnDP5s9mBGI=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/35151-traditional-filipino-lumpia-ddmfs-hero-1x2-0745-d25195def74049598ca7cfa057f9d77e.jpg",
      price: 100.0,
    },
    {
      name: "Bibingka",
      description:
        "A type of rice cake made with coconut milk and topped with salted egg and cheese.",
      imageUrl:
        "https://static01.nyt.com/images/2016/11/11/dining/COOKING-BIBINGKA1/COOKING-FILIPINO1-superJumbo.jpg",
      price: 70.0,
    },
    {
      name: "Sisig",
      description:
        "A sizzling dish made with chopped pork, onions, and chili peppers, often served with a raw egg on top.",
      imageUrl:
        "https://www.unileverfoodsolutions.com.ph/dam/global-ufs/mcos/SEA/calcmenu/recipes/PH-recipes/appetisers/sizzling-pork-sisig-manila/sizzling-pork-sisig-manila-main.jpg",
      price: 160.0,
    },
    {
      name: "Taho",
      description:
        "A sweet snack made with silken tofu, syrup, and tapioca pearls.",
      imageUrl:
        "https://www.rappler.com/tachyon/r3-assets/612F469A6EA84F6BAE882D2B94A4B421/img/ACA51A75866A42C4B123B5D8054D990D/giant-taho-20200527.jpg",
      price: 50.0,
    },
  ],
  cart: [],
};

const Header = {
  view: () =>
    m(
      "header",
      { class: "header" },
      m("h1", { class: "header__title" }, "Cusina ed Elmina"),
      m("nav", { class: "header__nav" }, [
        // m("a", { href: "#!/", oncreate: m.route.link, class: "header__nav-item" }, "Home"),
        m(
          "a",
          {
            href: "#!/foods",
            oncreate: m.route.link,
            class: "header__nav-item",
          },
          "Foods"
        ),
        m(
          "a",
          {
            href: "#!/cart",
            oncreate: m.route.link,
            class: "header__nav-item",
          },
          ["Cart", m("span", state.cart.length === 0 ? "" : state.cart.length)]
        ),
      ]),
      m(
        "button",
        {
          class: "btn",
          onclick: () => {
            document.body.classList.toggle("light");
            document.body.classList.toggle("dark");
            const newTheme = document.body.classList.contains("light")
              ? "light"
              : "dark";
            localStorage.setItem("theme", newTheme);
          },
        },
        "Toggle Theme"
      ),
      m(
        "button",
        {
          class: "toggle__menu__btn",
          onclick: () => {
            localStorage.clear();
            m.route.set("/foods");
          },
        },
        "Clear Cart"
      )
    ),
};

// const Home = {
//     view: () => m(".container", [
//         m(Header),
//         m("p", "Welcome to the Food Ordering System!")
//     ])
// };

const Foods = {
  oninit: async (vnode) => {
    // m.request({
    //     method: "GET",
    //     url: "https://api.example.com/foods"
    // }).then((result) => {
    //     vnode.state.foods = result;
    // });

    const response = await fetch("/foods");
    const data = await response.json();
  },
  view: (vnode) =>
    m(".container", [
      m(Header),
      m(
        ".foods__list",
        state.foods.map((food,index) =>
          m(".foods__item",{style: `--delay: ${index * 100}ms`}, [
            m("img", {
              class: "foods__image",
              src: food.imageUrl,
              alt: food.name,
            }),
            m(".foods__name", food.name),
            m("p", food.description),
            m("span", food.price + " PHP"),
            m(
              "button",
              {
                class: "btn foods__button",
                onclick: () => {
                  state.cart.push({
                    name: food.name,
                    imageUrl: food.imageUrl,
                    price: food.price,
                  });
                  console.log(state.cart);
                },
              },
              [m("i", { class: "fa fa-cart-plus" }), "Add to Cart"]
            ),
          ])
        )
      ),
    ]),
};

const Cart = {
  view: (vnode) =>
    m(".container", [
      m(Header),
      m(
        ".cart__list",
        state.cart.map((food) =>
          m(".cart__item", [
            m("img", {
              class: "cart__image",
              src: food.imageUrl,
              alt: food.name,
            }),
            m(".cart__name", food.name),
            m("p", { class: ".cart__name" }, [
              m("span", "Price: "),
              food.price,
            ]),
            m(
              "button",
              {
                class: "btn cart__button",
                onclick: () => {
                  state.cart.splice(state.cart.indexOf(food), 1);
                },
              },
              [m("i", { class: "fa fa-trash" }), "Remove from Cart"]
            ),
          ])
        )
      ),
      m(
        "p",
        "Total: ",
        state.cart.reduce((total, food) => total + food.price, 0)
      ),
      m("button", { class: "btn", onclick: redirectToCheckout }, "Checkout"),
    ]),
};

const Success = {
  view: () =>
    m(".container", [
      m(Header),
      m("p", "Payment Successful!"),
      m(
        "button",
        {
          class: "btn",
          onclick: () => {
            m.route.set("/foods");
          },
        },
        "Back to Foods"
      ),
    ]),
};
const Cancel = {
  view: () =>
    m(".container", [
      m(Header),
      m("p", "Payment Cancel!"),
      m(
        "button",
        {
          class: "btn",
          onclick: () => {
            m.route.set("/foods");
          },
        },
        "Back to Foods"
      ),
    ]),
};

async function redirectToCheckout() {
  // Call your server to create a Checkout Session
  if (state.cart.length === 0) {
    m.route.set("/foods");
    return;
  } else {
    const response = await m.request({
      method: "POST",
      url: "/api/create-checkout-session",
      body: {
        items: state.cart,
        total: state.cart.reduce((total, food) => total + food.price, 0),
      },
    });

    const stripe = Stripe(
      "pk_test_51Pa7Nx2K3SMP28NcbhNdD4MzfoiRXmZpdpTaZ6U6g6XtDgotXEIF0KT1UIhheCHqdI8b1LNayqlwbf2LqxnE6kah005s7aWGOx"
    );
    await stripe.redirectToCheckout({ sessionId: response.id });
  }
}

m.route(document.getElementById("app"), "/foods", {
  // "/": Home,
  "/foods": Foods,
  "/cart": Cart,
  "/success": Success,
  "/cancel": Cancel,
});
