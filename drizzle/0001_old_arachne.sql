CREATE TABLE `passwordHistory` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`passwords` json NOT NULL,
	`options` json NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `passwordHistory_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userSettings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`backgroundType` enum('system','color','image','custom') NOT NULL DEFAULT 'system',
	`backgroundColor` varchar(50),
	`backgroundImage` varchar(500),
	`customCSS` text,
	`passwordLength` int NOT NULL DEFAULT 16,
	`useUppercase` int NOT NULL DEFAULT 1,
	`useLowercase` int NOT NULL DEFAULT 1,
	`useNumbers` int NOT NULL DEFAULT 1,
	`useSpecialChars` int NOT NULL DEFAULT 0,
	`registrationEnabled` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `userSettings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `password` varchar(255);