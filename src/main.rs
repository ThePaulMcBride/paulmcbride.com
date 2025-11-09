use actix_web::{App, HttpResponse, HttpServer, Responder, get};
use tera::Tera;

mod posts;
mod tags;

#[get("/")]
async fn index() -> impl Responder {
    let tera = Tera::new("templates/**/*").unwrap();
    let index_html = tera.render("index.html", &tera::Context::new()).unwrap();

    HttpResponse::Ok().body(index_html)
}

#[get("/now")]
async fn now() -> impl Responder {
    HttpResponse::Ok().body("This is the now page.")
}

#[get("/colophon")]
async fn colophon() -> impl Responder {
    HttpResponse::Ok().body("This is the colophon page.")
}

#[get("/feed")]
async fn feed() -> impl Responder {
    HttpResponse::Ok().body("This is the feed page.")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(index)
            .service(now)
            .service(colophon)
            .service(feed)
            .configure(posts::router)
            .configure(tags::router)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
