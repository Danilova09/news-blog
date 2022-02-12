create schema nazik_danilova_exam_10 collate utf8_general_ci;
use nazik_danilova_exam_10;

create table news
(
    id          int auto_increment,
    title       varchar(100)                        not null,
    description text                                not null,
    image       varchar(100)                        null,
    datetime    timestamp default CURRENT_TIMESTAMP not null,
    constraint news_pk
        primary key (id)
);


create table comments
(
    id      int auto_increment,
    news_id int         not null,
    author  varchar(32) null,
    description text        not null,
    constraint comments_pk
        primary key (id),
    constraint comments_news_id_fk
        foreign key (news_id) references news (id)
);


INSERT INTO news (id, title, description, image, datetime)
VALUES (1, 'new title 1', 'news 1 text', null, DEFAULT);
INSERT INTO news (id, title, description, image, datetime)
VALUES (2, 'news title 2', 'news 2 text', null, DEFAULT);
INSERT INTO news (id, title, description, image, datetime)
VALUES (3, 'news title 3', 'news 3 text', null, DEFAULT);
INSERT INTO news (id, title, description, image, datetime)
VALUES (4, 'news title 4', 'news 4 text', null, DEFAULT);


INSERT INTO comments (id, news_id, author, description)
VALUES (1, 1, 'James', 'James''s comment');
INSERT INTO comments (id, news_id, author, description)
VALUES (2, 2, 'Amanda', 'Amanda''s comment');
INSERT INTO comments (id, news_id, author, description)
VALUES (3, 3, 'Jinx', 'Jix''s comment');
INSERT INTO comments (id, news_id, author, description)
VALUES (4, 4, 'Violette', 'Violette''s comment');