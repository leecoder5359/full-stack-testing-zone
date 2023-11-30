import { Controller, Get, Post } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user/repository/entity/user.entity';
import { Store } from './store/repository/entity/store.entity';
import { Menu } from './menu/entity/menu.entity';
import { Review } from './review/entity/review.entity';
import { faker } from '@faker-js/faker';
import { StoreCategory } from './store/repository/entity/store.enum';
import { ratingTransformer } from './review/entity/rating.enum';
import { Public } from './common/decorator/public.decorator';
import { Role } from './user/repository/enum/user.enum';
import { InjectRepository } from '@nestjs/typeorm';

@Controller()
export class AppController {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Store) private storeRepository: Repository<Store>,
        @InjectRepository(Menu) private menuRepository: Repository<Menu>,
        @InjectRepository(Review) private reviewRepository: Repository<Review>,
    ) {}

    @Public()
    @Post('mock')
    async createMock() {
        const fakeUsers = Array(20)
            .fill(1)
            .map(() => {
                const firstName = faker.name.firstName();
                const lastName = faker.name.lastName();
                return {
                    name: `${lastName}${firstName}`,
                    email: faker.internet.email(firstName, lastName),
                    password: `12345`,
                    role: Role.User,
                };
            });

        const users = await this.userRepository.save(fakeUsers);

        const stores = await this.storeRepository.save([
            {
                adminUser: users[0],
                name: '맛있는 치킨',
                images: [
                    'https://images.unsplash.com/photo-1600147184950-b0a367a98bc3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a29yZWFuJTIwZnJpZWQlMjBjaGlja2VufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                    'https://images.unsplash.com/photo-1575932444877-5106bee2a599?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a29yZWFuJTIwY2hpY2tlbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
                ],
                category: StoreCategory.CHICKEN,
                deliveryPrice: 3000,
                minimumOrderPrice: 15000,
            },
            {
                name: '죽이는 피자',
                images: [
                    'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGl6emF8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
                    'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cGl6emF8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
                ],
                category: StoreCategory.PIZZA,
                deliveryPrice: 2500,
                minimumOrderPrice: 15000,
            },
            {
                name: '배달집밥',
                images: [
                    'https://images.unsplash.com/photo-1590301157890-4810ed352733?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a29yZWFuJTIwZm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
                    'https://upload.wikimedia.org/wikipedia/commons/4/4c/Korean_stew-Kimchi_jjigae-01.jpg?20080118030922',
                ],
                category: StoreCategory.KOREA,
                deliveryPrice: 1000,
                minimumOrderPrice: 5000,
            },
            {
                name: '엄지네짬뽕',
                images: [
                    'https://images.unsplash.com/photo-1590301157890-4810ed352733?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MAxzZWFyY2h8Mnx8a29yZWFuJTIwZm9vZHxlbnwwfHwwfHw',
                    'https://live.staticflickr.com/3728/13171290065_75e3940d8f_b.jpg',
                ],
                category: StoreCategory.CHINA,
                deliveryPrice: 0,
                minimumOrderPrice: 5000,
            },
            {
                name: '스시히토츠',
                images: [
                    'https://images.unsplash.com/photo-1563612116625-3012372fccce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHN1c2hpfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                    'https://images.unsplash.com/photo-1584583570840-0a3d88497593?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHN1c2hpfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                ],
                category: StoreCategory.JAPAN,
                deliveryPrice: 4000,
                minimumOrderPrice: 10000,
            },
            {
                name: '월남면옥',
                images: [
                    'https://images.unsplash.com/photo-1576577445504-6af96477db52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGhvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                ],
                category: StoreCategory.ASIA,
                deliveryPrice: 2500,
                minimumOrderPrice: 12000,
            },
            {
                name: '부리부리또',
                images: [
                    'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dGFjb3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
                    'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YnVycml0b3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
                ],
                category: StoreCategory.MEXICAN,
                deliveryPrice: 5000,
                minimumOrderPrice: 12000,
            },
        ]);

        let 치킨집메뉴, 피자집메뉴, 한식집메뉴, 중국집메뉴, 일식집메뉴, 아시아집메뉴, 멕시칸집메뉴;
        let 치킨집id, 피자집id, 한식집id, 중국집id, 일식집id, 아시아집id, 멕시칸집id;

        for (const store of stores) {
            if (store.name === '맛있는 치킨') {
                치킨집id = store.id;
                치킨집메뉴 = await this.menuRepository.save([
                    {
                        store: store,
                        name: '후라이드치킨',
                        price: 15000,
                        description: '바삭바삭 맛있는 후라이드치킨',
                        images: [
                            'https://images.unsplash.com/photo-1575932444877-5106bee2a599?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a29yZWFuJTIwY2hpY2tlbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
                        ],
                        category: '후라이드',
                        isRecommended: true,
                        orderCount: 235,
                        likeCount: 124,
                        dislikeCount: 0,
                        additionalMenus: [
                            {
                                title: '치킨무 추가',
                                options: [
                                    {
                                        title: '치킨무 추가',
                                        price: 500,
                                    },
                                    {
                                        title: '추가 안함',
                                        price: 0,
                                    },
                                ],
                                required: true,
                                multiple: false,
                            },
                            {
                                title: '음료 추가',
                                options: [
                                    {
                                        title: '콜라',
                                        price: 2000,
                                    },
                                    {
                                        title: '사이다',
                                        price: 2000,
                                    },
                                ],
                                required: false,
                                multiple: true,
                            },
                        ],
                    },
                    {
                        store: store,
                        name: '양념치킨',
                        price: 17000,
                        description: '클래식하고 아주 맛있어요',
                        images: ['https://live.staticflickr.com/5543/10362831185_cda71f9c86_b.jpg'],
                        category: '양념',
                        isRecommended: true,
                        orderCount: 352,
                        likeCount: 243,
                        dislikeCount: 13,
                    },
                    {
                        store: store,
                        name: '허니갈릭치킨',
                        price: 20000,
                        category: '양념',
                        isRecommended: false,
                        orderCount: 232,
                        images: ['https://live.staticflickr.com/5543/10362831185_cda71f9c86_b.jpg'],
                        likeCount: 123,
                        dislikeCount: 25,
                    },
                    {
                        store: store,
                        name: '간장치킨',
                        price: 19000,
                        category: '양념',
                        isRecommended: false,
                        orderCount: 53,
                        images: ['https://live.staticflickr.com/5543/10362831185_cda71f9c86_b.jpg'],
                        likeCount: 12,
                        dislikeCount: 0,
                    },
                ]);
            }

            if (store.name === '죽이는 피자') {
                피자집id = store.id;
                피자집메뉴 = await this.menuRepository.save([
                    {
                        store: store,
                        name: '치즈피자',
                        price: 15000,
                        description: '기본중의 기본 치즈피자',
                        category: '피자',
                        images: [
                            'https://images.unsplash.com/photo-1627626775846-122b778965ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNoZWVzZSUyMHBpenphfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                        ],
                        isRecommended: true,
                        orderCount: 235,
                        likeCount: 124,
                        dislikeCount: 0,
                    },
                    {
                        store: store,
                        name: '마르게리따',
                        price: 18000,
                        images: [
                            'https://images.unsplash.com/photo-1627626775846-122b778965ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNoZWVzZSUyMHBpenphfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                        ],
                        category: '화덕피자',
                        isRecommended: true,
                        orderCount: 352,
                        likeCount: 243,
                        dislikeCount: 13,
                    },
                    {
                        store: store,
                        name: '페페로니',
                        price: 17000,
                        category: '피자',
                        images: [
                            'https://images.unsplash.com/photo-1627626775846-122b778965ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNoZWVzZSUyMHBpenphfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                        ],
                        isRecommended: false,
                        orderCount: 232,
                        likeCount: 123,
                        dislikeCount: 25,
                    },
                    {
                        store: store,
                        name: '슈프림피자',
                        price: 20000,
                        category: '피자',
                        images: [
                            'https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNoZWVzZSUyMHBpenphfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                        ],
                        isRecommended: false,
                        orderCount: 53,
                        likeCount: 12,
                        dislikeCount: 0,
                    },
                ]);
            }

            if (store.name === '배달집밥') {
                한식집id = store.id;
                한식집메뉴 = await this.menuRepository.save([
                    {
                        store: store,
                        name: '김치찌개',
                        price: 7000,
                        category: '찌개',
                        isRecommended: true,
                        images: [
                            'https://images.unsplash.com/photo-1627626775846-122b778965ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNoZWVzZSUyMHBpenphfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                        ],
                        orderCount: 235,
                        likeCount: 124,
                        dislikeCount: 0,
                    },
                    {
                        store: store,
                        name: '된장찌개',
                        price: 7000,
                        category: '찌개',
                        isRecommended: true,
                        images: [
                            'https://images.unsplash.com/photo-1627626775846-122b778965ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNoZWVzZSUyMHBpenphfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                        ],
                        orderCount: 352,
                        description: '바삭바삭 맛있는 된찌',
                        likeCount: 243,
                        dislikeCount: 13,
                    },
                    {
                        store: store,
                        name: '제육볶음',
                        price: 8000,
                        category: '고기',
                        isRecommended: false,
                        orderCount: 232,
                        images: [
                            'https://images.unsplash.com/photo-1627626775846-122b778965ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNoZWVzZSUyMHBpenphfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                        ],
                        likeCount: 123,
                        dislikeCount: 25,
                        description: '바삭바삭 맛있는 된찌',
                    },
                    {
                        store: store,
                        name: '언양불고기',
                        price: 10000,
                        category: '고기',
                        isRecommended: false,
                        orderCount: 53,
                        description: '바삭바삭 맛있는 된찌',
                        images: [
                            'https://images.unsplash.com/photo-1627626775846-122b778965ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNoZWVzZSUyMHBpenphfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                        ],
                        likeCount: 12,
                        dislikeCount: 0,
                    },
                    {
                        store: store,
                        name: '비빔밥',
                        price: 9000,
                        description: '바삭바삭 맛있는 된찌',
                        category: '밥류',
                        isRecommended: true,
                        orderCount: 553,
                        images: [
                            'https://images.unsplash.com/photo-1627626775846-122b778965ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNoZWVzZSUyMHBpenphfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                        ],
                        likeCount: 312,
                        dislikeCount: 0,
                    },
                ]);
            }

            if (store.name === '엄지네짬뽕') {
                중국집id = store.id;
                중국집메뉴 = await this.menuRepository.save([
                    {
                        store: store,
                        name: '짜장면',
                        price: 7000,
                        category: '면류',
                        isRecommended: true,
                        orderCount: 235,
                        likeCount: 124,
                        description: '바삭바삭 맛있는 된찌',
                        images: [
                            'https://images.unsplash.com/photo-1627626775846-122b778965ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNoZWVzZSUyMHBpenphfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                        ],
                        dislikeCount: 0,
                    },
                    {
                        store: store,
                        name: '짬뽕',
                        price: 8000,
                        category: '면류',
                        description: '바삭바삭 맛있는 된찌',
                        isRecommended: true,
                        orderCount: 352,
                        images: [
                            'https://images.unsplash.com/photo-1627626775846-122b778965ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNoZWVzZSUyMHBpenphfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                        ],
                        likeCount: 243,
                        dislikeCount: 13,
                    },
                    {
                        store: store,
                        name: '탕수육',
                        price: 15000,
                        description: '바삭바삭 맛있는 된찌',
                        category: '요리',
                        isRecommended: false,
                        orderCount: 232,
                        images: [
                            'https://images.unsplash.com/photo-1627626775846-122b778965ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNoZWVzZSUyMHBpenphfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                        ],
                        likeCount: 123,
                        dislikeCount: 25,
                    },
                    {
                        store: store,
                        name: '군만두',
                        price: 6000,
                        description: '바삭바삭 맛있는 된찌',
                        category: '요리',
                        images: [
                            'https://images.unsplash.com/photo-1627626775846-122b778965ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNoZWVzZSUyMHBpenphfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                        ],
                        isRecommended: false,
                        orderCount: 53,
                        likeCount: 12,
                        dislikeCount: 0,
                    },
                    {
                        store: store,
                        name: '유산슬',
                        description: '바삭바삭 맛있는 된찌',
                        price: 20000,
                        category: '요리',
                        isRecommended: true,
                        images: [
                            'https://images.unsplash.com/photo-1627626775846-122b778965ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNoZWVzZSUyMHBpenphfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                        ],
                        orderCount: 553,
                        likeCount: 312,
                        dislikeCount: 0,
                    },
                ]);
            }

            if (store.name === '스시히토츠') {
                일식집id = store.id;
                일식집메뉴 = await this.menuRepository.save([
                    {
                        store: store,
                        name: '연어초밥',
                        price: 11000,
                        category: '초밥',
                        isRecommended: true,
                        orderCount: 235,
                        likeCount: 124,
                        images: [
                            'https://images.unsplash.com/photo-1627626775846-122b778965ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNoZWVzZSUyMHBpenphfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                        ],
                        dislikeCount: 0,
                    },
                    {
                        store: store,
                        name: '광어초밥',
                        price: 10000,
                        category: '초밥',
                        isRecommended: true,
                        orderCount: 352,
                        likeCount: 243,
                        dislikeCount: 13,
                        images: [
                            'https://images.unsplash.com/photo-1627626775846-122b778965ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNoZWVzZSUyMHBpenphfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                        ],
                    },
                    {
                        store: store,
                        name: '캘리포니아롤',
                        price: 10000,
                        category: '롤',
                        isRecommended: false,
                        orderCount: 232,
                        likeCount: 123,
                        images: [
                            'https://images.unsplash.com/photo-1627626775846-122b778965ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNoZWVzZSUyMHBpenphfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                        ],
                        dislikeCount: 25,
                    },
                    {
                        store: store,
                        name: '참치회',
                        price: 20000,
                        category: '회',
                        isRecommended: false,
                        orderCount: 53,
                        likeCount: 12,
                        images: [
                            'https://images.unsplash.com/photo-1627626775846-122b778965ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNoZWVzZSUyMHBpenphfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                        ],
                        dislikeCount: 0,
                    },
                    {
                        store: store,
                        name: '모듬회',
                        price: 22000,
                        category: '회',
                        isRecommended: true,
                        orderCount: 553,
                        likeCount: 312,
                        images: [
                            'https://images.unsplash.com/photo-1627626775846-122b778965ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNoZWVzZSUyMHBpenphfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                        ],
                        dislikeCount: 0,
                    },
                ]);
            }

            if (store.name === '월남면옥') {
                아시아집id = store.id;
                아시아집메뉴 = await this.menuRepository.save([
                    {
                        store: store,
                        name: '쌀국수',
                        price: 10000,
                        images: [
                            'https://images.unsplash.com/photo-1576577445504-6af96477db52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGhvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                        ],
                        category: '면류',
                        isRecommended: true,
                        orderCount: 235,
                        likeCount: 124,
                        dislikeCount: 0,
                    },
                    {
                        store: store,
                        name: '팟타이',
                        price: 12000,
                        category: '면류',
                        isRecommended: true,
                        orderCount: 352,
                        images: [
                            'https://images.unsplash.com/photo-1576577445504-6af96477db52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGhvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                        ],
                        likeCount: 243,
                        dislikeCount: 13,
                    },
                    {
                        store: store,
                        name: '나시고랭',
                        price: 11000,
                        category: '볶음밥',
                        isRecommended: false,
                        images: [
                            'https://images.unsplash.com/photo-1576577445504-6af96477db52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGhvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                        ],
                        orderCount: 232,
                        likeCount: 123,
                        dislikeCount: 25,
                    },
                    {
                        store: store,
                        name: '파인애플 볶음밥',
                        price: 10000,
                        category: '볶음밥',
                        isRecommended: false,
                        images: [
                            'https://images.unsplash.com/photo-1576577445504-6af96477db52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGhvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                        ],
                        orderCount: 53,
                        likeCount: 12,
                        dislikeCount: 0,
                    },
                    {
                        store: store,
                        name: '반미',
                        price: 12000,
                        category: '샌드위치',
                        isRecommended: true,
                        images: [
                            'https://images.unsplash.com/photo-1576577445504-6af96477db52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGhvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                        ],
                        orderCount: 553,
                        likeCount: 312,
                        dislikeCount: 0,
                    },
                ]);
            }

            if (store.name === '부리부리또') {
                멕시칸집id = store.id;
                멕시칸집메뉴 = await this.menuRepository.save([
                    {
                        store: store,
                        name: '치킨타코',
                        price: 6000,
                        images: [
                            'https://images.unsplash.com/photo-1611699363906-056f01dd1ed8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpY2tlbiUyMHRhY298ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
                        ],
                        category: '타코',
                        isRecommended: true,
                        orderCount: 235,
                        likeCount: 124,
                        dislikeCount: 0,
                    },
                    {
                        store: store,
                        name: '쉬림프 타코',
                        price: 8000,
                        images: [
                            'https://images.unsplash.com/photo-1611250188496-e966043a0629?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c2hyaW1wJTIwdGFjb3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
                        ],
                        category: '타코',
                        isRecommended: true,
                        orderCount: 352,
                        likeCount: 243,
                        dislikeCount: 13,
                    },
                    {
                        store: store,
                        name: '부리또',
                        price: 12000,
                        category: '부리또',
                        isRecommended: false,
                        orderCount: 232,
                        likeCount: 123,
                        images: [
                            'https://images.unsplash.com/photo-1576577445504-6af96477db52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGhvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                        ],
                        dislikeCount: 25,
                    },
                    {
                        store: store,
                        name: '부리또볼',
                        price: 12000,
                        category: '부리또',
                        isRecommended: false,
                        orderCount: 53,
                        images: [
                            'https://images.unsplash.com/photo-1576577445504-6af96477db52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGhvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                        ],
                        likeCount: 12,
                        dislikeCount: 0,
                    },
                    {
                        store: store,
                        name: '퀘사디아',
                        price: 10000,
                        category: '퀘사디아',
                        isRecommended: true,
                        orderCount: 553,
                        images: [
                            'https://images.unsplash.com/photo-1576577445504-6af96477db52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGhvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                        ],
                        likeCount: 312,
                        dislikeCount: 0,
                    },
                ]);
            }
        }

        const 치킨집메뉴ids = 치킨집메뉴?.map((menu) => menu.id);
        const 피자집메뉴ids = 피자집메뉴?.map((menu) => menu.id);
        const 한식집메뉴ids = 한식집메뉴?.map((menu) => menu.id);
        const 중국집메뉴ids = 중국집메뉴?.map((menu) => menu.id);
        const 일식집메뉴ids = 일식집메뉴?.map((menu) => menu.id);
        const 아시아집메뉴ids = 아시아집메뉴?.map((menu) => menu.id);
        const 멕시칸집메뉴ids = 멕시칸집메뉴?.map((menu) => menu.id);

        console.log('created random menus');

        const storeAndMenus = [
            [치킨집id, 치킨집메뉴ids],
            [피자집id, 피자집메뉴ids],
            [한식집id, 한식집메뉴ids],
            [중국집id, 중국집메뉴ids],
            [일식집id, 일식집메뉴ids],
            [아시아집id, 아시아집메뉴ids],
            [멕시칸집id, 멕시칸집메뉴ids],
        ];

        console.log('created random menus', storeAndMenus);

        const menuMap: Record<string, string> = {};

        for (const [_, menuIds] of storeAndMenus) {
            console.log(menuIds);
            for (const menuId of menuIds) {
                console.log(menuId, menuId.toString());
                const menuQuery = await this.menuRepository.findOneBy({ id: menuId });
                console.log(menuId, menuQuery);
                const menuName = menuQuery?.name ?? '';
                console.log(menuId.toString(), menuName);
                menuMap[menuId.toString()] = menuName;
            }
        }

        console.log(menuMap);

        const getRandomElement = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

        const getRandomNumberOfElements = <T>(arr: T[]) => {
            const num = Math.floor(Math.random() * arr.length);
            return [
                ...new Set(
                    Array(num)
                        .fill(1)
                        .map(() => arr[Math.floor(Math.random() * arr.length)]),
                ),
            ];
        };

        const reviews = Array(1000)
            .fill(1)
            .map(() => {
                const user = getRandomElement(users);
                const store = getRandomElement(stores);
                const storemenus = [...치킨집메뉴, ...피자집메뉴, ...한식집메뉴, ...중국집메뉴, ...일식집메뉴, ...아시아집메뉴, ...멕시칸집메뉴].filter((menu) => menu.store.id === store.id);


                return {
                    user: user,
                    store: store,
                    menus: storemenus,
                    rating: ratingTransformer.to(Math.floor(Math.random() * 5) + 1),
                    content: faker.lorem.paragraph(),
                    images: [faker.image.food()],
                };
            });
        await this.reviewRepository.save(reviews);
    }
}
