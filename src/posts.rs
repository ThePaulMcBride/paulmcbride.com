use actix_web::{HttpResponse, Responder, get, web};

#[get("/")]
async fn posts_index() -> impl Responder {
    HttpResponse::Ok().body("hello from posts index")
}

#[get("/{slug}")]
async fn posts_show(slug: web::Path<String>) -> impl Responder {
    HttpResponse::Ok().body(format!("hello from post: {}", slug))
}

pub fn router(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("/posts").service(posts_index));
}
