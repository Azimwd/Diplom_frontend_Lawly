export const translations = {
	ru: {
		profilefield: {
			Pname: "Ваше имя",
			Lname: "Ваша фамилия",
			NameField: "Имя",
			LastNameField: "Фамилия",
			NumberField: "Номер",
			Avatar: "Аватар",
			ChangeAvatar: "Нажмите, чтобы изменить",
			EditProfile: "Редактировать профиль",
		},
		sidebar: {
			closeSidebar: "Закрыть панель",
			openSidebar: "Открыть панель",
			newChat: "Новый чат",
			listofChat: "Чаты",
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
			},
		},
		settings: {
			subscription: "План подписки",
			appearance: "Внешний вид",
			language: "Язык",
			logout: "Выйти",
			notSet: "Не установлено",
			themes: {
				dark: "Темная",
				light: "Светлая",
			},
		},
		EditNameComponent: {
			save: "Сохранить",
			cancel: "Отменить",
			rename: "Переименовать",
			delete: "Удалить",
		},
		Services: {
			findtext: "Поиск специалистов",
			chancetext: "Шанс побед",
			calctext: "Калькулятор",
			doctext: "Создать документ",
			consultext: "Консультация"
		}
	},
	en: {
		profilefield: {
			Pname: "Your name",
			Lname: "Your last name",
			NameField: "Name",
			LastNameField: "Last name",
			NumberField: "Number",
			Avatar: "Avatar",
			ChangeAvatar: "Click to change",
			EditProfile: "Edit Profile",
		},
		sidebar: {
			closeSidebar: "Close sidebar",
			openSidebar: "Open sidebar",
			newChat: "New chat",
			listofChat: "Chats",
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
			},
		},
		settings: {
			subscription: "Subscription plan",
			appearance: "Appearance",
			language: "Language",
			logout: "Log out",
			notSet: "Not set",
			themes: {
				dark: "Dark",
				light: "Light",
			},
		},
		EditNameComponent: {
			save: "Save",
			cancel: "Cancel",
			rename: "Rename",
			delete: "Delete",
		},
		Services: {
			findtext: "Search for specialists",
			chancetext: "A Chance to win",
			calctext: "Calculator",
			doctext: "Create a document",
			consultext: "Consultation"
		}
	},
	kk: {
		profilefield: {
			Pname: "Сіздің атыңыз",
			Lname: "Сіздің тегіңіз",
			NameField: "Аты",
			LastNameField: "Тегі",
			NumberField: "Нөмір",
			Avatar: "Аватар",
			ChangeAvatar: "Өзгерту үшін, басыңыз",
			EditProfile: "Профильді өңдеу",
		},
		sidebar: {
			closeSidebar: "Панельді жабу",
			openSidebar: "Панельді ашу",
			newChat: "Жаңа чат",
			listofChat: "Чаттар",
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
			},
		},
		settings: {
			subscription: "Жазылым жоспары",
			appearance: "Сыртқы түрі",
			language: "Тіл",
			logout: "Шығу",
			notSet: "Орнатылмаған",
			themes: {
				dark: "Қараңғы",
				light: "Жарық",
			},
		},
		EditNameComponent: {
			save: "Сақтау",
			cancel: "Болдырмау",
			rename: "Атын Өзгерту",
			delete: "Жою",
		},
		Services: {
			findtext: "Мамандарды іздеу",
			chancetext: "Жеңіс мүмкіндігі",
			calctext: "Калькулятор",
			doctext: "Құжат жасау",
			consultext: "кеңес беру"
		}
	},
};

export type Language = keyof typeof translations;
