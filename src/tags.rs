use actix_web::{HttpResponse, Responder, get, web};

#[get("/")]
async fn tags_index() -> impl Responder {
    HttpResponse::Ok().body("hello from tags index")
}

#[get("/{tag}")]
async fn tags_show(tag: web::Path<String>) -> impl Responder {
    HttpResponse::Ok().body(format!("hello from tag: {}", tag))
}

pub fn router(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("/tags").service(tags_index));
}
