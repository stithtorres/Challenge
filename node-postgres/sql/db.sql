create table if not exists users(
    id integer primary key generated by default as identity,
    name text not null check (name <> ''),
    email text not null unique,
    password text not null
);

create table if not exists ranks(
    id integer primary key generated by default as identity,
    value integer not null,
    movie_id integer not null,
    user_id integer references users(id)
);

create table if not exists comments(
    id integer primary key generated by default as identity,
    comment text not null,
    movie_id integer not null,
    user_name text not null,
    user_id integer references users(id)
);
/*sample user*/
insert into users (name,email,password) values ('admin','admin@admin.com.com','admin');
