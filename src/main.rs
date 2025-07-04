use actix_web::{App, HttpResponse, HttpServer, Responder, get};

mod posts;
mod tags;

#[get("/")]
async fn index() -> impl Responder {
    HttpResponse::Ok().body("Hello world!")
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
