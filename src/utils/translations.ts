export const translations = {
    ru: {
      sidebar: {
        closeSidebar: "Закрыть панель",
        openSidebar: "Открыть панель",
        newChat: "Новый чат",
        listofChat: "Чаты"
      },
      chat: {
        placeholder: "Напиши свой юридический вопрос…",
        loadingDoc: "Генерирую ваш документ, пожалуйста подождите...",
        trialExpired: "Истек пробный период, вы можете улучшить тариф",
        upgrade: "Улучшить",
        stop: "Стоп",
        send: "Отправить",
        modes: {
          calculator: "Режим калькулятора активирован...",
          winChance: "Режим анализа шанса побед активирован...",
          service: "Режим создания документа активирован...",
          topLawyer: "Режим поиска топ юристов активирован...",
        }
      },
      settings: {
        subscription: "План подписки",
        appearance: "Внешний вид",
        language: "Язык",
        logout: "Выйти",
        notSet: "Не установлено",
        themes: {
          dark: "Темная",
          light: "Светлая"
        }
      }
    },
    en: {
      sidebar: {
        closeSidebar: "Close sidebar",
        openSidebar: "Open sidebar",
        newChat: "New chat",
        listofChat: "Chats"
      },
      chat: {
        placeholder: "Ask your legal question...",
        loadingDoc: "Generating your document, please wait...",
        trialExpired: "Trial period expired, you can upgrade your plan",
        upgrade: "Upgrade",
        stop: "Stop",
        send: "Send",
        modes: {
          calculator: "Calculator mode activated...",
          winChance: "Win chance analysis mode activated...",
          service: "Document creation mode activated...",
          topLawyer: "Top lawyers search mode activated...",
        }
      },
      settings: {
        subscription: "Subscription plan",
        appearance: "Appearance",
        language: "Language",
        logout: "Log out",
        notSet: "Not set",
        themes: {
          dark: "Dark",
          light: "Light"
        }
      }
    },
    kk: {
      sidebar: {
        closeSidebar: "Панельді жабу",
        openSidebar: "Панельді ашу",
        newChat: "Жаңа чат",
        listofChat: "Чаттар"
      },
      chat: {
        placeholder: "Заң сұрағыңызды жазыңыз...",
        loadingDoc: "Құжат дайындалуда, күте тұрыңыз...",
        trialExpired: "Сынақ мерзімі аяқталды, тарифті жаңарта аласыз",
        upgrade: "Жаңарту",
        stop: "Тоқтату",
        send: "Жіберу",
        modes: {
          calculator: "Калькулятор режимі қосылды...",
          winChance: "Жеңіс мүмкіндігін талдау режимі қосылды...",
          service: "Құжат жасау режимі қосылды...",
          topLawyer: "Үздік заңгерлерді іздеу режимі қосылды...",
        }
      },
      settings: {
        subscription: "Жазылым жоспары",
        appearance: "Сыртқы түрі",
        language: "Тіл",
        logout: "Шығу",
        notSet: "Орнатылмаған",
        themes: {
          dark: "Қараңғы",
          light: "Жарық"
        }
      }
    }
  };
  
  export type Language = keyof typeof translations;