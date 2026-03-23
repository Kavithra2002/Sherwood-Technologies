
export class NoticeManager {
    constructor(board) {
        this.board = board;
        this.notices = [];
    }

    initializeDefaults() {
        // Mock data - in real app, fetch from quests/state
        const defaultNotices = [
            {
                id: 'n1',
                text: "📌 Important Rule\n\nIf it works, don’t touch it.\n\nIf you touched it… good luck.\n\nIf it stops working after you touched it,\nno one saw anything.\n\nIf someone asks,\nit was already broken.",
                type: 'info',
                color: 0xfffbea,
                x: -1.0, y: 0.6, rotation: -0.1
            },
            {
                id: 'n2',
                text: "Swimming Pool Reopening Event\n\nThe university swimming pool will reopen after maintenance.\n\n📅 Date: 21st October\n📍 Venue: University Pool\n⏰ Time: 8:00 AM\n\nEvents include:\n• Friendly Races\n• Free Swim Session\n\nAll students are welcome.",
                type: 'event',
                color: 0xe6f2ff,
                x: 0.8, y: 0.7, rotation: 0.15
            },
            {
                id: 'n3',
                text: "University Cricket Championship\n\nGet ready for an exciting cricket showdown between faculties.\n\n📅 Date: 18th October\n📍 Venue: Cricket Ground\n⏰ Time: 9:30 AM\n\nEvents include:\n• T20 Matches\n• Knockout Rounds\n• Final Match\n\nRegister before 15th October",
                type: 'event',
                color: 0xffebcd,
                x: -0.9, y: -0.6, rotation: 0.05
            },
            {
                id: 'n4',
                text: "Inter-University Sports Meet 2023\n\nThe Department of Physical Education proudly announces the Annual Inter-University Sports Meet 2023, bringing together athletes from across the country to compete in a range of sporting events.\nAll students are encouraged to participate and represent their faculty.\n\n📅 Date: 15th – 17th October 2023\n📍 Venue: University Sports Complex, Main Grounds & Indoor Stadium\n⏰ Time: 8:00 AM onwards\n\n🏅 Events Include:\n• Football Tournament\n• Basketball (Men & Women)\n• Cricket Matches\n• 100m / 200m / 400m Track Events\n• Long Jump & High Jump\n• Badminton (Singles & Doubles)",
                type: 'event',
                color: 0xffcccc,
                x: 0.7, y: -0.5, rotation: -0.12
            },
            {
                id: 'n5',
                text: "CODESPEC '23 National Tech & Innovation \nDate : 23 Sep\n Time :9AM-5:30PM\n Venue : Main Auditorium\n\nEvents:\n- CodeRush\n- Bug Hunt\n- WebCraft\n- Tech Quiz\n- Project Showcase\n\nPrizes: Trophies\n& Cash! \n All participants will receive Certificates of Participation.",
                type: 'event',
                color: 0xdff9fb,
                x: 0.0, y: 0.1, rotation: -0.05
            },

        ];

        defaultNotices.forEach(n => {
            this.board.addNotice(n);
        });
    }


}
